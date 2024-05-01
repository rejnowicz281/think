import getAllEntries from "@/actions/journal/read/get-all-entries";
import ErrorContainer from "@/components/general/error-container";
import EntryLink from "@/components/journal/entry-link";
import NewBulletForm from "@/components/journal/new-bullet-form";
import DragAndDropProvider from "@/providers/drag-and-drop-provider";
import { format } from "date-fns";

export default async function JournalPage() {
    const { entries } = await getAllEntries();

    if (!entries) return <ErrorContainer />;

    const entriesLength = Object.keys(entries).length;

    return (
        <div className="flex-1 flex flex-col max-w-[700px] w-full mx-auto px-6 py-16 gap-4">
            {entriesLength > 0 ? (
                <DragAndDropProvider>
                    {Object.keys(entries).map((date) => (
                        <EntryLink key={date} date={date} bullets={entries[date]} />
                    ))}
                </DragAndDropProvider>
            ) : (
                <NewBulletForm placeholder="Add bullet for today" date={format(new Date(), "yyyy-MM-dd")} pos={1} />
            )}
        </div>
    );
}
