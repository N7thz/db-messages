"use client"

import { findManyAttendants } from "@/actions/blip/find-many-attendants"
import { SearchInput } from "@/components/seach-input"
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
import { Skeleton } from "@/components/ui/skeleton"
import { extractNameFromBlipIdentity } from "@/functions/extract-name-from-blip-identity"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

export const AttendantsQuery = () => {

    const {
        data: attendants,
        isLoading
    } = useQuery({
        queryKey: ["find-many-tickets"],
        queryFn: () => findManyAttendants()
    })

    if (isLoading || !attendants) {
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

    const { resource: { items } } = attendants

    return (
        <Card className="flex-1 border-none rounded-none">
            <CardHeader className="border-b py-4">
                <SearchInput
                    placeholder="Pesquisar atendente..."
                    classNameDiv="w-2/3 mx-auto"
                />
            </CardHeader>
            <ScrollArea className="flex-1 min-h-200">
                <ScrollBar />
                <CardContent className="grid grid-cols-2 gap-2 space-y-2 px-2">
                    {
                        items.map(({
                            email, identity, status, teams
                        }) => (
                            <Card
                                key={identity}
                                className="min-h-40 overflow-hidden"
                            >
                                <CardHeader>
                                    <CardTitle className="capitalize text-xl">
                                        {
                                            extractNameFromBlipIdentity(identity)
                                        }
                                    </CardTitle>
                                    <CardDescription>
                                        {email}
                                    </CardDescription>
                                    <CardAction>
                                        <Badge className={cn(
                                            "text-sm",
                                            status === "Offline" && "opacity-60"
                                        )}>
                                            {status}
                                        </Badge>
                                    </CardAction>
                                </CardHeader>
                                <ScrollArea className="max-h-52">
                                    <CardFooter className="flex flex-wrap h-full gap-2.5 items-start px-4 py-4 mx-6 border rounded-lg text-xs drop-shadow-2xl">
                                        {teams.length === 0 ? (
                                            <Badge
                                                variant={"secondary"}
                                                className="w-fit px-3 py-2 rounded-md text-center whitespace-normal"
                                            >
                                                Sem listas adicionadas
                                            </Badge>
                                        ) : (
                                            teams.map(team => (
                                                <Badge
                                                    key={team}
                                                    className="w-fit px-3 py-2 rounded-md text-center whitespace-normal"
                                                >
                                                    {team}
                                                </Badge>
                                            ))
                                        )}
                                    </CardFooter>
                                </ScrollArea>
                            </Card>
                        ))
                    }
                </CardContent>
            </ScrollArea>
        </Card >
    )
}  