import { ThemeProvider } from "@/providers/theme-provider";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Think",
    description: "uhh uhhh umm uhh (think)",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html className="h-full" lang="en">
            <body className={clsx("min-h-full flex flex-col", GeistSans.className)}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <NextTopLoader height={4} showSpinner={false} />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
