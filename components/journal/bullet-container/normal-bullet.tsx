import { Bullet } from "@/types/bullet";

export default function NormalBullet({ bullet }: { bullet: Bullet }) {
    return (
        <div className="flex gap-2">
            <button className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></button>

            <p className="flex-1 word-break whitespace-pre-line">{bullet.text}</p>
        </div>
    );
}
