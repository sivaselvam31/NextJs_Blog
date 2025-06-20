"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import Header from "../layout/header";
import { cn } from "@/lib/utils";

interface ExtendedThemeProvider extends ThemeProviderProps {
  containerClassName?: string;
}

export default function ThemeProvider({
  children,
  containerClassName,
  ...props
}: ExtendedThemeProvider) {
  return (
    <NextThemesProvider {...props}>
      <Header />
      <main className={cn("container mx-auto px-4", containerClassName)}>
        {children}
      </main>
    </NextThemesProvider>
  );
}
