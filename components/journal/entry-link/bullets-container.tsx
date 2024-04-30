"use client";

import { Bullet } from "@/types/bullet";
import BulletContainer from "../bullet-container";

export default function BulletsContainer({ bulletList }: { bulletList: Bullet[] }) {
    return (
        <div className="bullets-container flex flex-col gap-2">
            {bulletList.map((bullet) => (
                <BulletContainer date={bullet.date} pos={bullet.pos} key={bullet.id} text={bullet.text} />
            ))}
        </div>
    );
}
