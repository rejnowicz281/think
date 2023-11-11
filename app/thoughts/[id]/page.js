import { getThought } from "@/actions/thoughts";
import Link from "next/link";

export default async function ThoughtPage({ params: { id } }) {
    const thought = await getThought(id);

    return (
        <div>
            <Link href="/thoughts">Back to Thoughts</Link>
            <h1>{thought.created_at}</h1>
            <i>{thought.id}</i>
            <p>{thought.text}</p>
            {thought.description && <p>({thought.description})</p>}
        </div>
    );
}
