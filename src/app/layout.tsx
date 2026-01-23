import { ThemeProvider } from "@/providers/theme-provider"
import { ReactNode } from "react"
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ptBR" suppressHydrationWarning>
      <body className="h-dvh w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}