import Link from "next/link";

export default function Entries({ entries }) {
    return (
        <ul>
            {entries.map((entry) => (
                <li key={entry.id}>
                    <Link href={`/entries/${entry.id}`}>{entry.text}</Link>
                </li>
            ))}
        </ul>
    );
}
