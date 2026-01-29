import { Aside } from "@/components/resizable-painel/aside"
import { SearchInput } from "@/components/seach-input"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider } from "@/components/ui/sidebar"
import { UploadFileDialog } from "@/components/upload-file-dialog"
import { auth } from "@/lib/auth"
import { LayoutProps } from "@/types"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function PrivateLayout({ children }: LayoutProps) {

	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) redirect("/sign-in")

	return (
		<SidebarProvider
			defaultOpen={defaultOpen}
			className="size-full"
		>
			<AppSidebar />
			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-[200px] md:min-w-[450px] flex-1"
			>
				<ResizablePanel
					defaultSize={25}
					minSize={15}
				>
					<Aside />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel
					defaultSize={75}
					minSize={40}
				>
					{children}
				</ResizablePanel>
			</ResizablePanelGroup>
		</SidebarProvider>
	)
}
