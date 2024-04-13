import { Bullet } from "@/types/bullet";
import Link from "next/link";
import BulletContainer from "./bullet-container";

export default function EntryLink({ bullets, date }: { bullets: Bullet[]; date: string; asLink?: boolean }) {
    const todayYear = new Date().toISOString().split("-")[0];
    const entryDateYear = date.split("-")[0];

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        year: todayYear === entryDateYear ? undefined : "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <Link
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md"
            href={`/journal/${date}`}
        >
            <div className="p-4 flex flex-col gap-2" key={date}>
                <h2 className="text-2xl font-bold">{formattedDate}</h2>
                <div className="flex flex-col gap-2">
                    {bullets.map((bullet) => (
                        <BulletContainer key={bullet.id} bullet={bullet} />
                    ))}
                </div>
            </div>
        </Link>
    );
}
