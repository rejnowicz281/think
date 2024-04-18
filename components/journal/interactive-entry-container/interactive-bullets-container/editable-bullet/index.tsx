"use client";

import BulletIndicator from "@/components/journal/bullet-form/bullet-indicator";
import { Bullet } from "@/types/bullet";
import smallDeviceDetected from "@/utils/general/small-device-detected";
import { Reorder, useDragControls } from "framer-motion";
import { useOptimistic, useState } from "react";
import EditableBulletForm from "./editable-bullet-form";

export default function EditableBullet({ bullet, onDragEnd }: { bullet: Bullet; onDragEnd: () => any }) {
    const [optimisticText, setOptimisticText] = useOptimistic(bullet.text);
    const [optimisticDelete, setOptimisticDelete] = useOptimistic(false);
    const [editing, setEditing] = useState(false);
    const controls = useDragControls();
    const [loading, setLoading] = useOptimistic(false);

    if (optimisticDelete) return null;

    const fullscreen = smallDeviceDetected() && editing;

    function Content() {
        return (
            <>
                {editing ? (
                    <EditableBulletForm
                        controls={fullscreen ? undefined : controls}
                        loading={loading}
                        bullet={bullet}
                        setLoading={setLoading}
                        editing={editing}
                        setEditing={setEditing}
                        optimisticText={optimisticText}
                        setOptimisticText={setOptimisticText}
                        setOptimisticDelete={setOptimisticDelete}
                    />
                ) : (
                    <>
                        <BulletIndicator loading={loading} controls={controls} />
                        <p
                            onClick={() => setEditing(true)}
                            className="bullet leading-relaxed cursor-text flex-1 word-break whitespace-pre-wrap"
                        >
                            {optimisticText}
                        </p>
                    </>
                )}
            </>
        );
    }

    if (fullscreen) {
        return (
            <div className="flex gap-2 group">
                <Content />
            </div>
        );
    } else
        return (
            <Reorder.Item
                layout="position"
                as="div"
                className="flex gap-2 group"
                onDragEnd={onDragEnd}
                dragListener={false}
                dragControls={controls}
                value={bullet.pos}
            >
                <Content />
            </Reorder.Item>
        );
}
