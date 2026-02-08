import { importAttendants } from "@/actions/attendants/import-attendants"
import { findManyAttendants } from "@/actions/blip/find-many-attendants"
import { getImportJob } from "@/actions/jobs/get-import-progress"
import { ImportProgressBar } from "@/components/import-progress-bar"
import { SpanErrorMessage } from "@/components/span-error"
import { toast } from "@/components/toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
    extractNameFromBlipIdentity
} from "@/functions/extract-name-from-blip-identity"
import { queryClient } from "@/providers/theme-provider"
import {
    ImportAttendantsProps, importAttendantsSchema
} from "@/schemas/import-attendants-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Import, ListChecks, ListX, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"

export type ImportFailedItem = {
    identity: string
    email: string
    reason: string
}

export const ImportAttendantsForm = () => {

    const [open, setOpen] = useState(false)
    const [jobId, setJobId] = useState<string | null>(null)

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ImportAttendantsProps>({
        resolver: zodResolver(importAttendantsSchema),
        defaultValues: {
            attendents: []
        },
        mode: "onSubmit"
    })

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "attendents"
    })

    const { data: job } = useQuery({
        queryKey: ["import-job", jobId],
        queryFn: () => getImportJob(jobId!),
        enabled: !!jobId,
        refetchInterval: (query) =>
            query.state.data?.status === "pending" ? 1000 : false,
    })

    useEffect(() => {

        setTimeout(() => {
            if (job?.status === undefined) {
                toast({
                    title: "Importação concluída",
                    onAutoClose: () => {
                        setOpen(false)
                        reset()
                    }
                })
            }
        }, 3500)

        if (job?.status === "error") {
            toast({
                title: "Importação interrompida",
                variant: "destructive",
            })
        }
    }, [job])

    const {
        mutate,
        isPending,
    } = useMutation({
        mutationKey: ["import-attendants"],
        mutationFn: ({ attendents }: ImportAttendantsProps) => {
            return importAttendants({ attendents })
        },
        onSuccess: ({ jobId }) => {

            setJobId(jobId)

            queryClient.invalidateQueries({
                queryKey: ["find-many-attendants"]
            })
        },
        onError: (error) => toast({
            title: error.name,
            description: error.message,
            variant: "destructive"
        })
    })

    const {
        data: attendants,
        isLoading
    } = useQuery({
        queryKey: ["find-many-attendants-blip"],
        queryFn: () => findManyAttendants()
    })

    if (!attendants || isLoading) {
        return (
            <div>
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} />
                    ))
                }
            </div>
        )
    }

    const { resource: { items } } = attendants

    const total = items.length
    const selected = fields.length
    const allSelected = total > 0 && selected === total

    const isChecked = (identity: string) =>
        fields.some(a => a.identity === identity)

    const indexByIdentity = (identity: string) =>
        fields.findIndex(a => a.identity === identity)

    function toggleAllAttendants() {

        if (!attendants) return

        if (allSelected) {
            remove()
            return
        }

        const all = attendants.resource.items.map(
            ({ identity, email, teams }) => ({
                identity,
                email,
                teams
            })
        )

        remove()
        append(all)
    }

    function onSubmit(data: ImportAttendantsProps) {
        mutate(data)
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger asChild>
                <Button>
                    <Import />
                    Importar atendentes
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-4/5">
                <AlertDialogHeader className="flex justify-between">
                    <div>
                        <AlertDialogTitle>
                            Importar atendentes
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {selected} de {total} atendentes selecionados
                        </AlertDialogDescription>
                    </div>
                    <Button
                        className="w-1/3"
                        disabled={isPending}
                        variant={allSelected ? "destructive" : "default"}
                        onClick={toggleAllAttendants}
                    >
                        {
                            allSelected ? <ListX /> : <ListChecks />
                        }
                        {
                            allSelected ? "Remover todos" : "Selecionar todos"
                        }
                    </Button>
                </AlertDialogHeader>
                <ScrollArea className="h-100">
                    <ScrollBar />
                    <form
                        id="import-attendants"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 grid grid-cols-2 gap-2"
                    >
                        {
                            items.map(({
                                identity, email, teams
                            }) => {
                                return (
                                    <Card key={identity}>
                                        <CardHeader>
                                            <CardTitle className="capitalize">
                                                {
                                                    extractNameFromBlipIdentity(identity)
                                                }
                                            </CardTitle>
                                            <CardDescription>
                                                {email}
                                            </CardDescription>
                                            <CardAction>
                                                <Checkbox
                                                    checked={isChecked(identity)}
                                                    onCheckedChange={(checked) => {
                                                        const index = indexByIdentity(identity)

                                                        if (checked && index === -1) {
                                                            append({ identity, email, teams })
                                                        }

                                                        if (!checked && index !== -1) {
                                                            remove(index)
                                                        }
                                                    }}
                                                />
                                            </CardAction>
                                        </CardHeader>
                                    </Card>
                                )
                            })
                        }
                    </form>
                </ScrollArea>
                {
                    errors.attendents &&
                    <SpanErrorMessage message={errors.attendents.message} />
                }
                {
                    job && (
                        <ImportProgressBar jobId={job.id} />
                    )
                }
                <AlertDialogFooter>
                    <AlertDialogCancel
                        type="button"
                        variant={"destructive"}
                        className="w-1/4"
                        disabled={isPending}
                    >
                        <X />
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        type="submit"
                        form="import-attendants"
                        disabled={isPending}
                        className="w-1/4"
                        onClick={(e) => {
                            e.preventDefault()

                            handleSubmit(onSubmit)()
                        }}
                    >
                        {
                            isPending
                                ?
                                (
                                    <Spinner />
                                )
                                : (
                                    <>
                                        <Import />
                                        Importar
                                    </>
                                )
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
