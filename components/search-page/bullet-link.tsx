import { Bullet } from "@/types/bullet";
import Link from "next/link";

export default function BulletLink({ bullet }: { bullet: Bullet }) {
    return (
        <Link
            href={`/journal/${bullet.date}`}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-zinc-50 dark:bg-zinc-900 transition-colors rounded-md border border-neutral-300 dark:border-neutral-800"
        >
            <div className="text-xs text-neutral-500 dark:text-neutral-400 p-2">{bullet.date}</div>
            <div className="p-2 text-neutral-900 dark:text-neutral-100">{bullet.text}</div>
        </Link>
    );
}
