export default function Bullets({ bullets }) {
    return bullets ? (
        <ul>
            {bullets.map((bullet) => (
                <li key={bullet.id}>{bullet.text}</li>
            ))}
        </ul>
    ) : (
        <p>Nothing here yet...</p>
    );
}
