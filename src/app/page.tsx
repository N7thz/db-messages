"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react"

export default function Home() {

  const { setOpen, open } = useSidebar()

  return (
    <main className="w-full flex-1">
      <header className="border-b h-16 flex items-center justify-between px-2">
        <ChevronRight
          onClick={() => setOpen(!open)}
          className={cn(open && "rotate-180 duration-150")}
        />
        <ModeToggle />
      </header>
      <div className="w-full flex p-2 gap-2">
        <Card className="w-1/4">
          <ScrollArea className="h-160">
            <ScrollBar />
            <CardContent className="space-y-2 px-2">
              {
                Array.from({ length: 20 }).map((_, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardAction>
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
        <Card className="w-3/4 pt-0 overflow-hidden">
          <CardHeader className=" h-1/8 flex items-center border-b">
            <CardTitle className="text-xl size-full flex items-center pl-2">
              Chat Title
            </CardTitle>
            <CardAction className="self-center">
              <Avatar className="size-12">
                <AvatarImage />
                <AvatarFallback>
                  CN
                </AvatarFallback>
              </Avatar>
            </CardAction>
          </CardHeader>
          <CardContent>
              
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
