"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PathnameContainer({
    href,
    content,
    activeContent,
}: {
    href: string;
    content: ReactNode;
    activeContent: ReactNode;
}) {
    const pathname = usePathname();

    const active = pathname === href;

    if (active) return activeContent;
    else return content;
}
