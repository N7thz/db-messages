"use client"

import {
    findContactIdByNumberPhone
} from "@/actions/blip/find-contact-id-by-number-phone"
import {
    findMessagesByIdentifyContact
} from "@/actions/blip/find-messages-by-identify-contact"
import { toast } from "@/components/toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"

export const ContactsQuery = ({ identity }: { identity: string }) => {

    const numberPhone = identity.slice(0, 13)

    const {
        data: contact,
        isLoading: contactLoading,
    } = useQuery({
        queryKey: ["find-contact-id-by-number-phone", numberPhone],
        queryFn: () => findContactIdByNumberPhone(numberPhone)
    })

    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["find-many-messages-by-identify", identity],
        queryFn: () => findMessagesByIdentifyContact(identity)
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

    console.log(contact)

    return (
        <Card className="flex-1 border-none rounded-none">
            <CardHeader>
                <CardTitle className="text-2xl mb-1.25">
                    {
                        (contactLoading || !contact)
                            ? <Skeleton className="h-8 w-full" />
                            : contact.resource.fullName
                                ? contact.resource.fullName
                                : contact.resource.phoneNumber
                    }
                </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1 min-h-200">
                <ScrollBar />
                <CardContent className="border-t space-y-1 pt-2">
                    {
                        resource.items.reverse().map(({
                            id, content, direction, date
                        }) => (
                            <div
                                key={id}
                                className={cn(
                                    "w-full flex",
                                    direction === "received"
                                        ? "justify-end"
                                        : "justify-start"
                                )}
                            >
                                <Alert className={cn(
                                    "max-w-[70%] w-fit px-4 py-2 text-sm text-foreground shadow-2xl space-y-2",
                                    "max-w-[70%] rounded-lg bg-muted p-4",
                                    direction === "received"
                                        ? "dark:bg-[#144d37] bg-[#d9fdd3] rounded-tr-none"
                                        : "dark:bg-muted bg-zinc-100 rounded-tl-none"
                                )}>
                                    <AlertTitle className="font-normal tracking-normal leading-normal break-words whitespace-pre-wrap block">
                                        {typeof content === "string" && content}
                                    </AlertTitle>
                                    {(
                                        typeof content === "object" &&
                                        content && "interactive" in content) && (
                                            <Alert>
                                                <pre>
                                                    {JSON.stringify(content, null, 2)}
                                                </pre>
                                                <AlertTitle>

                                                </AlertTitle>
                                            </Alert>
                                        )}
                                    <AlertDescription className="ml-auto">
                                        {formatDate(date, "HH:mm")}
                                    </AlertDescription>
                                </Alert>
                            </div>
                        ))
                    }
                </CardContent>
            </ScrollArea>
        </Card>
    )
}

// "content": {
//     "recipient_type": "individual",
//         "type": "interactive",
//             "interactive": {
//         "type": "button",
//             "body": {
//             "text": "Como posso te ajudar hoje?"
//         },
//         "action": {
//             "buttons": [
//                 {
//                     "type": "reply",
//                     "reply": {
//                         "id": 1,
//                         "title": "Credenciamento"
//                     }
//                 },
//                 {
//                     "type": "reply",
//                     "reply": {
//                         "id": 2,
//                         "title": "Comercial"
//                     }
//                 },
//                 {
//                     "type": "reply",
//                     "reply": {
//                         "id": 3,
//                         "title": "Agend e Suporte"
//                     }
//                 }
//             ]
//         }
//     }
// }