import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="w-full flex-1">
      <header className="border-b h-16 flex items-center justify-between px-2">
        <ModeToggle />
      </header>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] md:min-w-[450px] w-full"
      >
        <ResizablePanel
          defaultSize={25}
          minSize={15}
        >
          <Card className="size-full rounded-none">
            <ScrollArea className="h-230">
              <ScrollBar />
              <CardContent className="space-y-2 px-2 size-full">
                {
                  Array.from({ length: 20 }).map((_, index) => (
                    <Card key={index}>
                      <CardHeader className="has-data-[slot=card-action]:grid-cols-[auto_1fr]">
                        <CardAction className="col-start-1 row-span-2 row-start-1 justify-self-start">
                          <Avatar>
                            <AvatarImage />
                            <AvatarFallback>
                              CN
                            </AvatarFallback>
                          </Avatar>
                        </CardAction>
                        <CardTitle>
                          Item {index + 1}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))
                }
              </CardContent>
            </ScrollArea>
          </Card>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={75}
          minSize={40}
        >
          <Card className="w-full pt-0 rounded-none border-none overflow-hidden">
            <CardHeader className={cn(
              "h-1/8 flex items-center border-b py-2",
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
            <CardContent>

            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main >
  )
}
