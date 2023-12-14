import { getThought } from "@/actions/thoughts";

export default async function ThoughtPage({ params: { id } }) {
    const thought = await getThought(id);

    return (
        <div>
            <h1>{thought.created_at}</h1>
            <i>{thought.id}</i>
            <p>{thought.text}</p>
            {thought.description && <p>({thought.description})</p>}
        </div>
    );
}
