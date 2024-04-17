"use client";

import { Bullet } from "@/types/bullet";
import { Reorder, useDragControls } from "framer-motion";
import { useOptimistic, useState } from "react";
import EditableBulletForm from "./editable-bullet-form";
import EditableBulletIndicator from "./editable-bullet-indicator";

export default function EditableBullet({ bullet, onDragEnd }: { bullet: Bullet; onDragEnd: () => any }) {
    const [optimisticText, setOptimisticText] = useOptimistic(bullet.text);
    const [optimisticDelete, setOptimisticDelete] = useOptimistic(false);
    const [editing, setEditing] = useState(false);
    const controls = useDragControls();
    const [loading, setLoading] = useOptimistic(false);

    if (optimisticDelete) return null;

    return (
        <Reorder.Item
            layout="position"
            as="div"
            className="flex gap-2 group"
            onDragEnd={onDragEnd}
            key={bullet.id}
            dragListener={false}
            dragControls={controls}
            value={bullet.pos}
        >
            <EditableBulletIndicator loading={loading} controls={controls} />

            {editing ? (
                <EditableBulletForm
                    bullet={bullet}
                    setLoading={setLoading}
                    editing={editing}
                    setEditing={setEditing}
                    optimisticText={optimisticText}
                    setOptimisticText={setOptimisticText}
                    setOptimisticDelete={setOptimisticDelete}
                />
            ) : (
                <p
                    onClick={() => setEditing(true)}
                    className="bullet leading-relaxed cursor-text flex-1 word-break whitespace-pre-wrap"
                >
                    {optimisticText}
                </p>
            )}
        </Reorder.Item>
    );
}
