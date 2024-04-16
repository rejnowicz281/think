import getDateBullets from "@/actions/journal/read/get-date-bullets";
import ErrorContainer from "@/components/general/error-container";
import InteractiveEntryContainer from "@/components/journal/interactive-entry-container";
import { Button } from "@/components/ui/button";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import { addDays, format } from "date-fns";
import Link from "next/link";

export default async function JournalEntryPage({ params: { date } }: { params: { date: string } }) {
    const { bullets } = await getDateBullets(date);

    if (!bullets) return <ErrorContainer />;

    const prevDate = format(addDays(new Date(date), -1), "yyyy-MM-dd");
    const nextDate = format(addDays(new Date(date), 1), "yyyy-MM-dd");

    return (
        <div className="relative flex flex-col flex-1 max-w-[700px] w-full mx-auto px-8 pt-16">
            <InteractiveEntryContainer bullets={bullets} date={date} />

            <div className="dark:bg-[#121212] bg-white border-t dark:border-t-neutral-800 border-t-neutral-300 flex mt-16 sticky bottom-0">
                <Button asChild variant="ghost" className="rounded-none flex-1">
                    <Link className="flex items-center" href={`/journal/${prevDate}`}>
                        <MdKeyboardArrowLeft className="mr-2 w-5 h-5" />
                        <span className="hidden sm:inline">Previous Entry</span>
                    </Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-none flex-1">
                    <Link className="flex items-center" href={`/journal/${nextDate}`}>
                        <span className="hidden sm:inline">Next Entry</span>
                        <MdKeyboardArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
