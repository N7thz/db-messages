import { ChatMessages } from "@/components/chat-message"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { messages } from "@/mocks/messages"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | Chat App",
}

export default function Home() {

  const currentUser = "nathan ferreira"

  return (
    <Card className="size-full pt-0 rounded-none border-none overflow-hidden gap-0">
      <CardHeader className={cn(
        "h-24 flex items-center py-2",
        "has-data-[slot=card-action]:grid-cols-[auto_1fr]"
      )}>
        <CardAction className={cn(
          "self-center",
          "col-start-1 row-span-2 row-start-1 justify-self-start"
        )}>
          <Avatar className="size-12">
            <AvatarImage />
            <AvatarFallback>
              CN
            </AvatarFallback>
          </Avatar>
        </CardAction>
        <CardTitle className="text-xl size-full flex items-center pl-2">
          Chat Title
        </CardTitle>
      </CardHeader>
      <ChatMessages
        messages={messages}
        currentUser={currentUser}
      />
    </Card>
  )
}
