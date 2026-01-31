import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { LimeSelectContent } from "@/types/lime-thread-messages-response.types"
import { formatDate } from "date-fns"

export const ContactScopeTextResponse = ({
    direction,
    date,
    value
}: {
    direction: "sent" | "received"
    value: string
    date: string
}) => {
    return (
        <Alert className={cn(
            "max-w-[70%] w-fit text-sm text-foreground shadow-2xl space-y-2",
            direction === "sent"
                ? "dark:bg-[#144d37] bg-[#d9fdd3] rounded-tr-none"
                : "dark:bg-muted bg-zinc-100 rounded-tl-none"
        )}>
            <AlertTitle className="font-normal tracking-normal leading-normal break-words whitespace-pre-wrap block">
                {value}
            </AlertTitle>
            <AlertDescription className="ml-auto">
                {formatDate(date, "HH:mm")}
            </AlertDescription>
        </Alert>
    )
}
