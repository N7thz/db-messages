"use client"

import { findManyContacts } from "@/actions/blip/find-many-contacts"
import { SearchInput } from "@/components/seach-input"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { Contact, Ellipsis } from "lucide-react"
import { toast } from "../toast"
import { Button } from "../ui/button"
import { da, ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"

export const Aside = () => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["find-many-contacts"],
        queryFn: () => findManyContacts()
    })

    if (isLoading || !data) {
        return (
            <p>
                Carregando...
            </p>
        )
    }

    if (error) {
        return (
            toast({
                title: error.name,
                duration: Infinity,
                description: error.message,
                variant: "destructive",
                action: {
                    label: "Tentar novamente",
                    onClick: () => refetch()
                }
            })
        )
    }

    const { resource } = data

    return (
        <Card className="size-full rounded-none">
            <CardHeader>
                <SearchInput />
            </CardHeader>
            <ScrollArea className="min-h-200 size-full border-t pt-4">
                <ScrollBar />
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Contact className="size-6"/>
                        Contatos
                        <span>
                            ({resource.total})
                        </span>
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="space-y-2 px-2 size-full pt-4">
                    {
                        resource.items.map(({
                            identity,
                            name,
                            extras,
                            ...rest
                        }) => {

                            const lastMessageDate = (
                                rest.lastMessageDate
                                    ? formatDate(
                                        rest.lastMessageDate, "dd 'de' MMM 'de' yyyy 'às' HH:mm",
                                        { locale: ptBR }
                                    )
                                    : null
                            )

                            const phoneNumber = (
                                rest.phoneNumber
                                    ? rest
                                        .phoneNumber
                                        .slice(3)
                                        .replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
                                    : null
                            )

                            return (
                                <Card
                                    key={identity}
                                    className={cn(
                                        "size-full cursor-pointer transition-all",
                                        "hover:bg-card/60 hover:border-2 hover:scale-95"
                                    )}
                                >
                                    <CardHeader>
                                        <CardTitle className="truncate">
                                            {name}
                                        </CardTitle>
                                        {
                                            phoneNumber && (
                                                <CardDescription>
                                                    {phoneNumber}
                                                </CardDescription>
                                            )
                                        }
                                        <CardAction>
                                            <Button variant={"ghost"}>
                                                <Ellipsis />
                                            </Button>
                                        </CardAction>
                                    </CardHeader>
                                    {
                                        lastMessageDate && (
                                            <CardFooter>
                                                <CardDescription className="font-extralight">
                                                    {lastMessageDate}
                                                </CardDescription>
                                            </CardFooter>
                                        )
                                    }
                                </Card>
                            )
                        })
                    }
                </CardContent>
            </ScrollArea>
        </Card>
    )
}
