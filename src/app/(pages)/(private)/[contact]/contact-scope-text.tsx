import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LimeSelectContent } from "@/types/lime-thread-messages-response.types"
import { formatDate } from "date-fns"

export const ContactScopeText = ({
    direction,
    date,
    content: { options, text }
}: {
    direction: "sent" | "received"
    content: LimeSelectContent
    date: string
}) => {
    return (
        <Card className={cn(
            "w-1/2 text-sm",
            direction === "sent"
                ? "dark:bg-[#144d37] bg-[#d9fdd3] rounded-tr-none"
                : "dark:bg-muted bg-zinc-100 rounded-tl-none"
        )}>
            <CardHeader>
                <CardTitle>
                    {text}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {
                    options.map(({ text }) => (
                        <Button
                            key={text}
                            className="w-full"
                            variant={"outline"}
                            type="button"
                        >
                            {text}
                        </Button>
                    ))
                }
            </CardContent>
            <CardFooter className="ml-auto">
                {formatDate(date, "HH:mm")}
            </CardFooter>
        </Card>
    )
}
