import getAllEntries from "@/actions/entries/read/get-all-entries";
import BulletForm from "@/components/entries/bullet-form";
import ErrorContainer from "@/components/general/error-container";

export default async function EntriesPage() {
    const { entries } = await getAllEntries();

    if (!entries) return <ErrorContainer />;

    return (
        <div className="flex-1 flex flex-col max-w-[600px] w-full mx-auto p-12 gap-4">
            <BulletForm />
            <div className="word-break flex flex-col gap-4">
                {Object.keys(entries).map((date) => (
                    <div className="flex flex-col gap-2" key={date}>
                        <h2 className="text-2xl font-bold">{date}</h2>
                        <ul>
                            {entries[date].map((bullet) => (
                                <li key={bullet.id} className="mb-2">
                                    <div className="flex gap-2">
                                        <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                                        <p>{bullet.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
