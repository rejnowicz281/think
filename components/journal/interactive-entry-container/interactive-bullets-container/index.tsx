"use client";

import updateBulletsPos from "@/actions/journal/modify/update-bullets-pos";
import NewBulletForm from "@/components/journal/new-bullet-form";
import { Bullet } from "@/types/bullet";
import { Reorder } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import EditableBullet from "./editable-bullet";

export default function InteractiveBulletsContainer({
    optimisticBullets,
    setOptimisticBullets,
    date,
}: {
    optimisticBullets: Bullet[];
    setOptimisticBullets: (action: Bullet[] | ((pendingState: Bullet[]) => Bullet[])) => void;
    date: string;
}) {
    const [reorderBullets, setReorderBullets] = useState<Bullet[]>(optimisticBullets);
    const submitRef = useRef<HTMLButtonElement>(null);

    // making sure position is updated on error
    useEffect(() => {
        if (JSON.stringify(reorderBullets) === JSON.stringify(optimisticBullets)) return;

        setReorderBullets(optimisticBullets);
    }, [optimisticBullets]);

    const newPos = (() => {
        const optimisticLength = optimisticBullets.length;
        const newBulletPos = optimisticBullets[optimisticLength - 1]?.pos + 1;
        const lengthPlusOne = optimisticLength + 1;

        return typeof newBulletPos === "number" && newBulletPos > lengthPlusOne ? newBulletPos : lengthPlusOne;
    })();

    return (
        <>
            <form
                className="hidden"
                action={() => {
                    if (JSON.stringify(reorderBullets) === JSON.stringify(optimisticBullets)) return;

                    setOptimisticBullets(reorderBullets);
                    updateBulletsPos(reorderBullets);
                }}
            >
                <button ref={submitRef} type="submit" />
            </form>
            <div className="flex flex-col gap-2">
                <Reorder.Group
                    as="div"
                    className="flex flex-col gap-2"
                    onReorder={(values) => {
                        const newBullet = values.map((pos) => {
                            const bullet = reorderBullets.find((bullet) => bullet.pos === pos);
                            if (bullet) bullet.pos = values.indexOf(pos);
                            return bullet;
                        });
                        setReorderBullets(newBullet as Bullet[]);
                    }}
                    axis="y"
                    values={reorderBullets.map((bullet) => bullet.pos)}
                >
                    {reorderBullets.map((bullet) =>
                        (() => {
                            const optimisticBullet = optimisticBullets.find((b) => b.id === bullet.id);
                            if (!optimisticBullet) return null;
                            // make sure bullet uses the draggable position, not the optimistic one
                            const b = { ...optimisticBullet, pos: bullet.pos };
                            return (
                                <EditableBullet
                                    key={bullet.id}
                                    bullet={b}
                                    onDragEnd={() => submitRef.current?.click()}
                                />
                            );
                        })()
                    )}
                </Reorder.Group>
                <NewBulletForm date={date} pos={newPos} />
            </div>
        </>
    );
}
