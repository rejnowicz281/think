export default function BulletText({ text, onClick }: { text: string; onClick?: () => void }) {
    return (
        <p onClick={onClick} className="bullet leading-relaxed flex-1 word-break whitespace-pre-line">
            {text}
        </p>
    );
}
