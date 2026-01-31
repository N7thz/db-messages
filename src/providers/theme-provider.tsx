"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { QueryDevtools } from "./react-query-dev-tools"

const client = new QueryClient()

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={client}>
        <QueryDevtools />
        {children}
      </QueryClientProvider>
    </NextThemesProvider>
  )
}