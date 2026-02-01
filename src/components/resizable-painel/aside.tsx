"use client"

import { findManyContacts } from "@/actions/blip/find-many-contacts"
import { SearchInput } from "@/components/seach-input"
import { toast } from "@/components/toast"
import { Badge } from "@/components/ui/badge"
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
import { normalizeWhatsAppIdentify } from "@/functions/validate-identify"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Contact, Ellipsis } from "lucide-react"
import Link from "next/link"
import { AsideLoading } from "./aside-loading"
import { usePathname } from "next/navigation"

export const Aside = () => {

    const pathname = usePathname().slice(1)

    console.log(pathname)

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
            <AsideLoading />
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
                        <Contact className="size-6" />
                        Contatos
                        <Badge className="h-full">
                            {resource.total}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="px-2 size-full pt-4">
                    {
                        resource.items.map(({
                            identity,
                            name,
                            ...rest
                        }) => {

                            const contact = normalizeWhatsAppIdentify(identity)

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
                                <Link
                                    key={identity}
                                    href={`/${contact}`}
                                    className="group"
                                >
                                    <Card className={cn(
                                        "size-full transition-all",
                                        "group-hoverbg-card/60 group-hoverborder-2 group-hover:scale-95 my-2",
                                        pathname === identity && "bg-secondary border-none"
                                    )}>
                                        <CardHeader>
                                            <CardTitle className="truncate font-semibold capitalize">
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
