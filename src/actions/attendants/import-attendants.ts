"use server"

import { 
    extractNameFromBlipIdentity 
} from "@/functions/extract-name-from-blip-identity"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ImportAttendantsProps } from "@/schemas/import-attendants-schema"

export async function importAttendants({ attendents }: ImportAttendantsProps) {

    const job = await prisma.importJob.create({
        data: {
            total: attendents.length,
            status: "pending",
        },
    })

        // roda em background
        ; (async () => {
            try {
                // marca como running
                await prisma.importJob.update({
                    where: { id: job.id },
                    data: { status: "running" },
                })

                for (const { identity, email, teams } of attendents) {
                    try {
                        const exists = await prisma.user.findUnique({
                            where: { identity },
                        })

                        if (!exists) {
                            await auth.api.signUpEmail({
                                body: {
                                    email,
                                    name: extractNameFromBlipIdentity(identity),
                                    password: "Chabra@123",
                                    identity,
                                    teams,
                                },
                            })
                        }
                    } catch (itemError) {
                        // salva erro individual
                        await prisma.importJob.update({
                            where: { id: job.id },
                            data: {
                                failed: {
                                    push: {
                                        identity,
                                        email,
                                        reason: (itemError as Error).message,
                                    },
                                },
                            },
                        })
                    } finally {
                        await prisma.importJob.update({
                            where: { id: job.id },
                            data: {
                                processed: { increment: 1 },
                            },
                        })
                    }
                }

                await prisma.importJob.update({
                    where: { id: job.id },
                    data: { status: "done" },
                })

            } catch {
                await prisma.importJob.update({
                    where: { id: job.id },
                    data: { status: "error" },
                })
            } finally {
                // ⏳ apaga o job após 10 segundos
                setTimeout(async () => {
                    try {
                        await prisma.importJob.delete({
                            where: { id: job.id },
                        })
                    } catch {
                        // evita crash se já tiver sido deletado
                    }
                }, 10_000)
            }
        })()

    return { jobId: job.id }
}
