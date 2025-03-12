"use client"

import { createContext, useContext, type ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type Theme = "light" | "dark" | "system"

type ThemeContextType = {
  theme?: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
})

export function ThemeProvider({ children, ...props }: { children: ReactNode; [key: string]: any }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

