import { getEntry } from "@/actions/entries";
import Link from "next/link";

export default async function EntriesPage({ params: { id } }) {
    const entry = await getEntry(id);

    return (
        <div>
            <Link href="/entries">Back to Entries</Link>
            <h1>{entry.created_at}</h1>
            <i>{entry.id}</i>
            <p>{entry.text}</p>
        </div>
    );
}
