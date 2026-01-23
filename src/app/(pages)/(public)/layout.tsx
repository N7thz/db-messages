import { auth } from "@/lib/auth"
import { LayoutProps } from "@/types"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function PublicLayout({ children }: LayoutProps) {
	
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (session) redirect("/")

	return <>{children}</>
}
