"use client";

import deleteBullet from "@/actions/journal/modify/delete-bullet";
import updateBullet from "@/actions/journal/modify/update-bullet";
import { Bullet } from "@/types/bullet";
import { RxDragHandleDots2 } from "@react-icons/all-files/rx/RxDragHandleDots2";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { Reorder, useDragControls } from "framer-motion";
import { PointerEvent, useEffect, useOptimistic, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function EditableBullet({ bullet, onDragEnd }: { bullet: Bullet; onDragEnd: () => any }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);
    const [optimisticText, setOptimisticText] = useOptimistic(bullet.text);
    const [optimisticDelete, setOptimisticDelete] = useOptimistic(false);
    const [editing, setEditing] = useState(false);
    const controls = useDragControls();
    const [loading, setLoading] = useOptimistic(false);

    useEffect(() => {
        if (textareaRef.current) textareaRef.current.value = optimisticText;
    }, [optimisticText]);

    useEffect(() => {
        if (editing && textareaRef.current) textareaRef.current.focus();
    }, [editing]);

    function handleSubmit() {
        if (submitRef.current) {
            submitRef.current.click();
            setEditing(false);
        }
    }

    async function handleAction(formData: FormData) {
        const inputFormData = formData.get("text");
        const input = typeof inputFormData === "string" ? inputFormData.trim() : "";

        if (input === optimisticText) return;

        setLoading(true);
        setOptimisticText(input);

        if (input === "") {
            setOptimisticDelete(true);
            await deleteBullet(formData);
        } else await updateBullet(formData, bullet.text);

        setLoading(false);
    }

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
                <form className="flex-1 flex flex-col" action={handleAction}>
                    <input type="hidden" name="id" value={bullet.id} />
                    <ReactTextareaAutosize
                        onFocus={(e) => {
                            const temp_value = e.target.value;
                            e.target.value = "";
                            e.target.value = temp_value;
                        }}
                        onBlur={handleSubmit}
                        id={`text-${bullet.id}`}
                        name="text"
                        defaultValue={bullet.text}
                        className="bg-inherit outline-none resize-none overflow-hidden leading-relaxed"
                        ref={textareaRef}
                    />

                    <button type="submit" ref={submitRef} className="hidden"></button>
                </form>
            ) : (
                <p
                    onClick={() => setEditing(true)}
                    className="leading-relaxed cursor-text flex-1 word-break whitespace-pre-line"
                >
                    {optimisticText}
                </p>
            )}
        </Reorder.Item>
    );
}
