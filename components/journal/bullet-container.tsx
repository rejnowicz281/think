import { Bullet } from "@/types/bullet";

export default function BulletContainer({ bullet }: { bullet: Bullet }) {
    return (
        <div className="flex gap-2">
            <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
            <p className="word-break whitespace-pre-line">{bullet.text}</p>
        </div>
    );
}
