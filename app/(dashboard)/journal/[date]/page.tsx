import getDateBullets from "@/actions/journal/read/get-date-bullets";
import ErrorContainer from "@/components/general/error-container";
import BulletForm from "@/components/journal/bullet-form";
import InteractiveBulletsContainer from "@/components/journal/interactive-bullets-container";
import { Button } from "@/components/ui/button";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import Link from "next/link";

export default async function JournalEntryPage({ params: { date } }: { params: { date: string } }) {
    const journalDate = (() => {
        if (date === "today") return new Date();
        if (date === "yesterday") return new Date(Date.now() - 86400000);
        if (date === "tomorrow") return new Date(Date.now() + 86400000);

        return new Date(date);
    })();

    const fullDate = journalDate.toISOString().split("T")[0];

    const { bullets } = await getDateBullets(fullDate);

    if (!bullets) return <ErrorContainer />;

    const todayYear = new Date().toISOString().split("-")[0];
    const entryDateYear = journalDate.toISOString().split("-")[0];

    const monthDay = journalDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: todayYear === entryDateYear ? undefined : "numeric",
    });
    const weekday = journalDate.toLocaleDateString("en-US", { weekday: "long" });

    return (
        <div className="flex-1 flex flex-col max-w-[750px] w-full mx-auto p-12 gap-4">
            <Button asChild variant="ghost">
                <Link className="flex items-center gap-1" href="/">
                    <MdKeyboardArrowLeft className="text-2xl" /> Journal
                </Link>
            </Button>
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">{monthDay}</h1>
                <h2 className="text-xl text-gray-500 font-semibold">{weekday}</h2>

                <div className="flex flex-col gap-2">
                    <InteractiveBulletsContainer bulletList={bullets} />
                    <BulletForm date={fullDate} pos={bullets.length + 1} />
                </div>
            </div>
        </div>
    );
}
