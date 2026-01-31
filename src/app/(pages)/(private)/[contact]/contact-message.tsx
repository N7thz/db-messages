import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { stringToHTML } from "@/functions/string-to-HTML"
import { cn } from "@/lib/utils"
import { formatDate } from "date-fns"

export const ContactMessage = ({
    direction,
    content,
    date
}: {
    direction: "sent" | "received"
    content: string
    date: string
}) => {

    const Content = stringToHTML(content)

    return (
        <Alert className={cn(
            "max-w-[70%] w-fit text-sm text-foreground shadow-2xl space-y-2",
            direction === "sent"
                ? "dark:bg-[#144d37] bg-[#d9fdd3] rounded-tr-none"
                : "dark:bg-muted bg-zinc-100 rounded-tl-none"
        )}>
            <AlertTitle className="font-normal tracking-normal leading-normal break-words whitespace-pre-wrap block">
                {Content}
            </AlertTitle>
            <AlertDescription className="ml-auto">
                {formatDate(date, "HH:mm")}
            </AlertDescription>
        </Alert>
    )
}
