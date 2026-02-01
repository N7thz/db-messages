import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { extractNameFromBlipIdentity } from "@/functions/extract-name-from-blip-identity"
import { stringToHTML } from "@/functions/string-to-HTML"
import { cn } from "@/lib/utils"
import { LimeMetadata } from "@/types/lime-thread-messages-response.types"
import { formatDate } from "date-fns"

export const ContactMessage = ({
    direction,
    content,
    date,
    metadata
}: {
    direction: "sent" | "received"
    content: string
    date: string
    metadata?: LimeMetadata
}) => {

    const Content = stringToHTML(content)

    const attendantName = extractNameFromBlipIdentity(metadata?.["#message.agentIdentity"])

    return (
        <Alert className={cn(
            "max-w-[70%] w-fit text-sm text-foreground shadow-2xl space-y-2",
            direction === "sent"
                ? "dark:bg-[#144d37] bg-[#d9fdd3] rounded-tr-none"
                : "dark:bg-muted bg-zinc-100 rounded-tl-none"
        )}>
            {
                attendantName && (
                    <AlertTitle className="capitalize">
                        {attendantName}
                    </AlertTitle>
                )
            }
            <AlertTitle className="font-normal tracking-normal leading-normal break-words whitespace-pre-wrap block">
                {Content}
            </AlertTitle>
            <AlertDescription className="ml-auto">
                {formatDate(date, "HH:mm")}
            </AlertDescription>
        </Alert>
    )
}
