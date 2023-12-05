export default function Thoughts({ thoughts }) {
    return thoughts ? (
        <ul>
            {thoughts.map((thought) => (
                <li key={thought.id}>{thought.text}</li>
            ))}
        </ul>
    ) : null;
}
