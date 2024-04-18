"use client";

import updateBulletsPos from "@/actions/journal/modify/update-bullets-pos";
import { Bullet } from "@/types/bullet";
import { Reorder } from "framer-motion";
import { useEffect, useOptimistic, useRef, useState } from "react";
import EditableBullet from "./editable-bullet";

export default function InteractiveBulletsContainer({ bulletList }: { bulletList: Bullet[] }) {
    const [optimisticBullets, setOptimisticBullets] = useOptimistic<Bullet[]>(bulletList);
    const [bullets, setBullets] = useState<Bullet[]>(bulletList);
    const submitRef = useRef<HTMLButtonElement>(null);

    // making sure position is updated on error
    useEffect(() => {
        if (JSON.stringify(bullets) === JSON.stringify(optimisticBullets)) return;

        setBullets(optimisticBullets);
    }, [optimisticBullets]);

    return (
        <>
            <form
                className="hidden"
                action={() => {
                    if (JSON.stringify(bullets) === JSON.stringify(optimisticBullets)) return;

                    setOptimisticBullets(bullets);
                    updateBulletsPos(bullets);
                }}
            >
                <button ref={submitRef} type="submit" />
            </form>
            <Reorder.Group
                as="div"
                className="flex flex-col gap-2"
                onReorder={(values) => {
                    const newBullet = values.map((pos) => {
                        const bullet = bullets.find((bullet) => bullet.pos === pos);

                        if (bullet) bullet.pos = values.indexOf(pos);

                        return bullet;
                    });
                    setBullets(newBullet as Bullet[]);
                }}
                axis="y"
                values={bullets.map((bullet) => bullet.pos)}
            >
                {bullets.map((bullet) =>
                    (() => {
                        const optimisticBullet = optimisticBullets.find((b) => b.id === bullet.id);

                        if (!optimisticBullet) return null;

                        // make sure bullet uses the draggable position, not the optimistic one
                        const b = { ...optimisticBullet, pos: bullet.pos };

                        return (
                            <EditableBullet key={bullet.id} bullet={b} onDragEnd={() => submitRef.current?.click()} />
                        );
                    })()
                )}
            </Reorder.Group>
        </>
    );
}