"use client"

import { findManyTickets } from "@/actions/blip/find-many-tickets"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
    extractNameFromBlipIdentity
} from "@/functions/extract-name-from-blip-identity"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"

export const TicketsQuery = () => {

    const {
        data: tickets,
        isLoading
    } = useQuery({
        queryKey: ["find-many-tickets"],
        queryFn: () => findManyTickets()
    })

    if (isLoading || !tickets) {
        return (
            <Card className="flex-1 border-none rounded-none">
                <ScrollArea className="flex-1 min-h-200">
                    <ScrollBar />
                    <CardContent className="grid grid-cols-2 gap-2 space-y-2 px-2">
                        {
                            Array.from({ length: 7 }).map((_, index) => (
                                <Card
                                    key={index}
                                    className="justify-between h-40"
                                >
                                    <CardHeader>
                                        <CardTitle>
                                            <Skeleton className="h-6 rounded-full" />
                                        </CardTitle>
                                        <CardDescription>
                                            <Skeleton className="w-1/2 h-4 rounded-full" />
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))
                        }
                    </CardContent>
                </ScrollArea>
            </Card>
        )
    }

    const { resource: { items } } = tickets

    function translateStatus(status: string) {

        if (status === "ClosedAttendant") {
            return "atendimento encerrado"
        } else if (status === "Transferred") {
            return "transferido"
        }

        return "aberto"
    }

    return (
        <Card className="flex-1 border-none rounded-none">
            <ScrollArea className="flex-1 min-h-200">
                <ScrollBar />
                <CardContent className="flex flex-col gap-2 space-y-2 px-2">
                    {
                        items.map(({
                            id, status, team, closedBy, closeDate
                        }) => (
                            <Card
                                key={id}
                                className="justify-between min-h-40"
                            >
                                <CardHeader>
                                    <CardTitle>
                                        {id}
                                    </CardTitle>
                                    <CardAction>
                                        <Badge className="text-sm">
                                            {translateStatus(status)}
                                        </Badge>
                                    </CardAction>
                                </CardHeader>
                                <CardFooter className="flex-col gap-2.5 items-start">
                                    <div className="flex">
                                        fila:
                                        <Badge
                                            variant={"secondary"} className="text-sm mx-2"
                                        >
                                            {
                                                team !== "DIRECT_TRANSFER"
                                                    ? team : "transferência direta"
                                            }
                                        </Badge>
                                    </div>
                                    {
                                        closeDate && (
                                            <div className="flex">
                                                fechado em:
                                                <Badge className="text-sm mx-2">
                                                    {formatDate(closeDate, "PPP", { locale: ptBR })}
                                                </Badge>
                                            </div>

                                        )
                                    }
                                    <Separator orientation="vertical" />
                                    {
                                        closedBy && (
                                            <div className="flex">
                                                fechado por:
                                                <Badge className="text-sm mx-2">
                                                    {extractNameFromBlipIdentity(closedBy)}
                                                </Badge>
                                            </div>

                                        )
                                    }
                                </CardFooter>
                            </Card>
                        ))
                    }
                </CardContent>
            </ScrollArea>
        </Card >
    )
}  