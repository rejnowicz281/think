"use client";

import { Bullet } from "@/types/bullet";

export default function BulletsContainer({ bulletList }: { bulletList: Bullet[] }) {
    return (
        <div className="flex flex-col gap-2">
            {bulletList.map((bullet) => (
                <div className="flex gap-2" key={bullet.id}>
                    <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <p className="flex-1 word-break whitespace-pre-line">{bullet.text}</p>
                </div>
            ))}
        </div>
    );
}
