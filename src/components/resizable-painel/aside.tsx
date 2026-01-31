"use client"

import { findManyContacts } from "@/actions/blip/find-many-contacts"
import { SearchInput } from "@/components/seach-input"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
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
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Contact, Ellipsis } from "lucide-react"
import Link from "next/link"

export const Aside = () => {

    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
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

    console.log(resource)

    return (
        <Card className="size-full rounded-none">
            <CardHeader>
                <SearchInput />
            </CardHeader>
            <ScrollArea className="min-h-200 size-full border-t pt-4">
                <ScrollBar />
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Contact className="size-6" />
                        Contatos
                        <span>
                            ({resource.total})
                        </span>
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="px-2 size-full pt-4">
                    {
                        resource.items.map(({
                            identity,
                            name,
                            extras,
                            ...rest
                        }) => {

                            const contactIsValid = identity.includes("@wa.gw.msging.net")

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

                            if (!contactIsValid) {
                                return (
                                    <Card
                                        key={identity}
                                        className={cn(
                                            "size-full my-2 opacity-60 cursor-not-allowed"
                                        )}
                                        title="Não é possivel acessar esse contato"
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
                            }

                            return (
                                <Link
                                    key={identity}
                                    href={`/${identity}`}
                                    className="group"
                                >
                                    <Card className={cn(
                                        "size-full transition-all",
                                        "group-hoverbg-card/60 group-hoverborder-2 group-hover:scale-95 my-2"
                                    )}>
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
                                </Link>
                            )
                        })
                    }
                </CardContent>
            </ScrollArea>
        </Card>
    )
}
