import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/providers/theme-provider"
import { JetBrains_Mono } from "next/font/google"
import { ReactNode } from "react"
import { Background } from "@/components/background"
import "./globals.css"

const jetBrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={cn(jetBrains.className, "antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Background>
            {children}
          </Background>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}