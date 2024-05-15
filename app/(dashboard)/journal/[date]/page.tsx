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
        <div className="relative flex flex-col flex-1 max-w-[600px] w-full mx-auto">
            <div className="flex-1 flex flex-col pt-16 px-8 sm:px-0">
                <InteractiveEntryContainer
                    bullets={bullets}
                    date={date}
                    showDeleteButton={true && bullets.length > 0}
                />
            </div>

            <div className="dark:bg-[#121212] bg-white flex justify-end mt-16 pb-4 pr-4 sticky bottom-0">
                <Button asChild variant="ghost" size="icon" className="rounded-full">
                    <Link className="flex items-center" href={`/journal/${prevDate}`}>
                        <MdKeyboardArrowLeft className="w-7 h-7" />
                    </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" className="rounded-full">
                    <Link className="flex items-center" href={`/journal/${nextDate}`}>
                        <MdKeyboardArrowRight className="w-7 h-7" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
