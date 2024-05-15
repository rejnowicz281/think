"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavButton({ icon, href }: { icon: ReactNode; href: string }) {
    const pathname = usePathname();

    const isActive = href === "/" ? pathname === href : pathname?.includes(href);

    return (
        <Button
            asChild
            size="icon"
            className={clsx(
                isActive && "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700",
                "rounded-full"
            )}
            variant="ghost"
        >
            <Link href={href}>{icon}</Link>
        </Button>
    );
}
