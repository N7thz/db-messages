"use client"

import {
    findContactIdByNumberPhone
} from "@/actions/blip/find-contact-id-by-number-phone"
import {
    findMessagesByIdentifyContact
} from "@/actions/blip/find-messages-by-identify-contact"
import { toast } from "@/components/toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ContactInterative } from "./contact-interative"
import { ContactInterativeList } from "./contact-interative-list"
import { ContactMessage } from "./contact-message"
import { ContactScopeText } from "./contact-scope-text"
import { ContactsQueryLoading } from "./contacts-query-loading"
import { stringToHTML } from "@/functions/string-to-HTML"
import { Button } from "@/components/ui/button"
import { ContactScopeAvaliation } from "./contact-scope-avaliation"
import { ContactScopeTextResponse } from "./contact-scope-text-response"

export const ContactsQuery = ({ identity }: { identity: string }) => {

    const numberPhone = identity.slice(0, 13)

    const {
        data: contact,
        isLoading: contactIsLoading
    } = useQuery({
        queryKey: ["find-contact-id-by-number-phone", identity],
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
            <ContactsQueryLoading />
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
        <Card className="flex-1 border-none rounded-none">
            <CardHeader className="border-b pb-3 gap-0">
                <CardTitle className="text-2xl mb-1.25">
                    {
                        (contactIsLoading || !contact)
                            ? <Skeleton className="h-8 w-full rounded-full" />
                            : contact.resource.fullName
                    }
                </CardTitle>
                <CardDescription>
                    {
                        (contactIsLoading || !contact)
                            ? <Skeleton className="h-6 w-full rounded-full" />
                            : contact.resource.phoneNumber
                    }
                </CardDescription>
            </CardHeader>
            <ScrollArea className="flex-1 min-h-200">
                <ScrollBar />
                <CardContent className="space-y-2 px-2">
                    {
                        [...resource.items].reverse().map(({
                            id, direction, content, date
                        }) => {

                            if (
                                typeof content === "object" &&
                                "recipient_type" in content &&
                                "interactive" in content &&
                                "body" in content.interactive &&
                                "action" in content.interactive &&
                                "button" in content.interactive.action
                            ) {
                                console.log(content.interactive.action)
                            }

                            return (
                                <div
                                    key={id}
                                    className={cn(
                                        "w-full flex",
                                        direction === "sent"
                                            ? "justify-end"
                                            : "justify-start"
                                    )}
                                >
                                    {
                                        (
                                            typeof content === "object" &&
                                            "recipient_type" in content &&
                                            "interactive" in content &&
                                            "body" in content.interactive &&
                                            "action" in content.interactive &&
                                            "button" in content.interactive.action
                                        ) && (
                                            <ContactInterativeList
                                                date={date}
                                                direction={direction}
                                                sections={content.interactive.action.sections}
                                                title={content.interactive.body.text}
                                            />
                                        )
                                    }
                                    {
                                        (
                                            typeof content === "object" &&
                                            "options" in content &&
                                            !("scope" in content) &&
                                            direction === "sent"
                                        ) && (
                                            <ContactScopeAvaliation
                                                content={content}
                                                date={date}
                                                direction={direction}
                                            />
                                        )
                                    }
                                    {
                                        (
                                            typeof content === "object" &&
                                            "replied" in content &&
                                            "value" in content.replied
                                        ) && (
                                            <ContactScopeTextResponse
                                                date={date}
                                                direction={direction}
                                                value={content.replied.value}
                                            />
                                        )
                                    }
                                    {
                                        (
                                            typeof content === "object" &&
                                            "replied" in content &&
                                            "interactive" in content.inReplyTo.value &&
                                            "type" in content.inReplyTo.value.interactive &&
                                            content.inReplyTo.value.interactive.type === "list" &&
                                            direction === "sent"
                                        ) && (
                                            <ContactInterativeList
                                                title={
                                                    content.inReplyTo.value.interactive.body.text
                                                }
                                                sections={
                                                    content.inReplyTo.value.interactive.action.sections
                                                }
                                                date={date}
                                                direction={direction}
                                            />
                                        )
                                    }
                                    {
                                        (
                                            typeof content === "object" &&
                                            "replied" in content &&
                                            "interactive" in content.inReplyTo.value &&
                                            "type" in content.inReplyTo.value.interactive &&
                                            content.inReplyTo.value.interactive.type === "button" &&
                                            direction === "sent"
                                        ) && (
                                            <ContactInterative
                                                title={
                                                    content.inReplyTo.value.interactive.body.text
                                                }
                                                buttons={
                                                    content.inReplyTo.value.interactive.action.buttons
                                                }
                                                date={date}
                                                direction={direction}
                                            />
                                        )
                                    }
                                    {
                                        typeof content === "string" && (
                                            <ContactMessage
                                                date={date}
                                                content={content}
                                                direction={direction}
                                            />
                                        )
                                    }
                                    {(
                                        typeof content === "object" &&
                                        "scope" in content
                                    ) && (
                                            <ContactScopeText
                                                content={content}
                                                date={date}
                                                direction={direction}
                                            />
                                        )
                                    }
                                    {(
                                        typeof content === "object" &&
                                        "interactive" in content &&
                                        "body" in content.interactive &&
                                        "buttons" in content.interactive.action
                                    ) && (
                                            <ContactInterative
                                                title={content.interactive.body.text}
                                                buttons={
                                                    content
                                                        .interactive
                                                        .action
                                                        .buttons
                                                }
                                                date={date}
                                                direction={direction}
                                            />
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </CardContent>
            </ScrollArea>
        </Card>
    )
}