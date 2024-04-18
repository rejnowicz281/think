import { Bullet } from "@/types/bullet";
import NewBulletForm from "../new-bullet-form";
import InteractiveBulletsContainer from "./interactive-bullets-container";

export default function InteractiveEntryContainer({ bullets, date }: { bullets: Bullet[]; date: string }) {
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

    return (
        <div className="flex-1 flex gap-4 justify-center flex-col">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-bold">{monthDay}</h1>
                <h2 className="text-xl text-gray-500 font-semibold">{weekday}</h2>
            </div>

            <div className="flex flex-col gap-2">
                <InteractiveBulletsContainer bulletList={bullets} />
                <NewBulletForm date={fullDate} pos={bullets.length + 1} />
            </div>
        </div>
    );
}
