import Link from "next/link";

export default function Thoughts({ thoughts }) {
    return (
        <ul>
            {thoughts.map((thought) => (
                <li key={thought.id}>
                    <Link href={`/thoughts/${thought.id}`}>{thought.text}</Link>
                </li>
            ))}
        </ul>
    );
}
