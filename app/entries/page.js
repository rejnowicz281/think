import { getEntries } from "@/actions/entries";
import Link from "next/link";

export default async function EntriesPage() {
    const entries = await getEntries();

    return (
        <>
            <Link href="/thoughts">Go to Thoughts</Link>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        <Link href={`/entries/${entry.id}`}>{entry.text}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
