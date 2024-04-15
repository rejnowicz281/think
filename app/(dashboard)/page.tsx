import getAllEntries from "@/actions/journal/read/get-all-entries";
import ErrorContainer from "@/components/general/error-container";
import BulletForm from "@/components/journal/bullet-form";
import EntryLink from "@/components/journal/entry-link";

export default async function JournalPage() {
    const { entries } = await getAllEntries();

    if (!entries) return <ErrorContainer />;

    const entriesLength = Object.keys(entries).length;

    return (
        <div className="flex-1 flex flex-col max-w-[700px] w-full mx-auto p-6 pt-16 gap-4">
            {entriesLength > 0 ? (
                Object.keys(entries).map((date) => <EntryLink key={date} date={date} bullets={entries[date]} />)
            ) : (
                <BulletForm placeholder="Add bullet for today" />
            )}
        </div>
    );
}
