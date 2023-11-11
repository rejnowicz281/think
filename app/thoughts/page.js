import { getThoughts } from "@/actions/thoughts";
import Link from "next/link";

export default async function ThoughtsPage() {
    const thoughts = await getThoughts();

    return (
        <>
            <Link href="/entries">Go to Entries</Link>
            <ul>
                {thoughts.map((thought) => (
                    <li key={thought.id}>
                        <Link href={`/thoughts/${thought.id}`}>{thought.text}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
