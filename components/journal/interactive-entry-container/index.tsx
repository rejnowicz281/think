"use client";

import deleteEntry from "@/actions/journal/modify/delete-entry";
import { Button } from "@/components/ui/button";
import { Bullet } from "@/types/bullet";
import { addDays, format } from "date-fns";
import { Trash2Icon } from "lucide-react";
import { useOptimistic } from "react";
import InteractiveBulletsContainer from "./interactive-bullets-container";

export default function InteractiveEntryContainer({
    bullets,
    date,
    showDeleteButton = false,
}: {
    bullets: Bullet[];
    date: string;
    showDeleteButton?: boolean;
}) {
    const [optimisticBullets, setOptimisticBullets] = useOptimistic(bullets);

    const journalDate = new Date(date);

    const fullDate = journalDate.toISOString().split("T")[0];

    const todayYear = new Date().toISOString().split("-")[0];
    const entryDateYear = journalDate.toISOString().split("-")[0];

    const monthDay = journalDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: todayYear === entryDateYear ? undefined : "numeric",
    });
    const weekday = journalDate.toLocaleDateString("en-US", { weekday: "long" });

    const today = new Date().toISOString().split("T")[0];
    const yesterday = format(addDays(new Date(), -1), "yyyy-MM-dd");
    const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
    const isToday = fullDate === today;
    const isYesterday = fullDate === yesterday;
    const isTomorrow = fullDate === tomorrow;

    return (
        <div className="flex-1 flex flex-col">
            {showDeleteButton && (
                <form
                    className="absolute top-4 right-4"
                    action={(formData: FormData) => {
                        deleteEntry(formData);
                        setOptimisticBullets([]);
                    }}
                >
                    <input type="hidden" name="date" value={fullDate} />
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Trash2Icon className="w-6 h-6 text-gray-400" />
                    </Button>
                </form>
            )}
            <div className="flex-1 flex gap-4 justify-center flex-col">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-bold">{monthDay}</h1>
                    <h2 className="text-xl text-gray-500 font-semibold">
                        {weekday}
                        {isToday ? " / #today" : isYesterday ? " / #yesterday" : isTomorrow ? " / #tomorrow" : ""}
                    </h2>
                </div>
                <InteractiveBulletsContainer
                    date={fullDate}
                    optimisticBullets={optimisticBullets}
                    setOptimisticBullets={setOptimisticBullets}
                />
            </div>
        </div>
    );
}
