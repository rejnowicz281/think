"use client";

import { Bullet } from "@/types/bullet";
import { RxDragHandleDots2 } from "@react-icons/all-files/rx/RxDragHandleDots2";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { Reorder, useDragControls } from "framer-motion";
import { PointerEvent, useOptimistic, useState } from "react";
import EditableBulletForm from "./editable-bullet-form";

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
            {loading ? (
                <VscLoading className="w-2 h-2 animate-spin mt-2" />
            ) : (
                <div
                    onPointerDown={(e: PointerEvent<Element> | PointerEvent) => {
                        e.preventDefault();
                        controls.start(e);
                    }}
                    style={{ touchAction: "none" }}
                    className="w-2 flex items-start justify-center relative cursor-move"
                >
                    <div className="mt-1 flex-1 opacity-0 transition-opacity duration-300 absolute group-focus-within:flex group-focus-within:opacity-25 group-focus-within:static group-hover:static group-hover:flex group-hover:opacity-75">
                        <RxDragHandleDots2 className="flex-1 shrink-0 text-xl" />
                    </div>
                    <div className="mt-2 flex-1 h-2 transition-opacity duration-300 opacity-100 group-focus-within:opacity-0 group-focus-within:absolute group-hover:opacity-0 group-hover:absolute shrink-0 rounded-full bg-blue-500"></div>
                </div>
            )}

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
