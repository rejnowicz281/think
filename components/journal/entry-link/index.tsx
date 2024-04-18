import { Bullet } from "@/types/bullet";
import { addDays, format } from "date-fns";
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

    const fullDate = new Date(date).toISOString().split("T")[0];

    const today = new Date().toISOString().split("T")[0];
    const yesterday = format(addDays(new Date(), -1), "yyyy-MM-dd");
    const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
    const isToday = fullDate === today;
    const isYesterday = fullDate === yesterday;
    const isTomorrow = fullDate === tomorrow;

    const href = `/journal/${date}`;

    return (
        <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md" href={href}>
            <div className="p-4 flex flex-col gap-2" key={date}>
                <h2 className="text-2xl font-bold gap-2">
                    {formattedDate}
                    {isToday ? (
                        <span className="text-sm text-gray-500"> ~ today</span>
                    ) : isYesterday ? (
                        <span className="text-sm text-gray-500"> ~ yesterday</span>
                    ) : isTomorrow ? (
                        <span className="text-sm text-gray-500"> ~ tomorrow</span>
                    ) : (
                        ""
                    )}
                </h2>
                <BulletsContainer bulletList={bullets} />
            </div>
        </Link>
    );
}
