"use client";

import { Bullet } from "@/types/bullet";
import BulletContainer from "../bullet-container";

export default function BulletsContainer({ bulletList }: { bulletList: Bullet[] }) {
    return (
        <div className="flex flex-col gap-2">
            {bulletList.map((bullet) => (
                <BulletContainer key={bullet.id} text={bullet.text} />
            ))}
        </div>
    );
}
