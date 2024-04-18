import { Bullet } from "@/types/bullet";
import Link from "next/link";
import BulletsContainer from "./bullets-container";

export default function EntryLink({ bullets, date }: { bullets: Bullet[]; date: string; asLink?: boolean }) {
    const todayYear = new Date().toISOString().split("-")[0];
    const entryDateYear = date.split("-")[0];

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        year: todayYear === entryDateYear ? undefined : "numeric",
        month: "short",
        day: "numeric",
    });

    const href = `/journal/${date}`;

    return (
        <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md" href={href}>
            <div className="p-4 flex flex-col gap-2" key={date}>
                <h2 className="text-2xl font-bold">{formattedDate}</h2>
                <BulletsContainer bulletList={bullets} />
            </div>
        </Link>
    );
}