"use client";

import deleteBullet from "@/actions/journal/modify/delete-bullet";
import updateBullet from "@/actions/journal/modify/update-bullet";
import { Bullet } from "@/types/bullet";
import { RxDragHandleDots2 } from "@react-icons/all-files/rx/RxDragHandleDots2";
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

    function handleAction(formData: FormData) {
        const inputFormData = formData.get("text");
        const input = typeof inputFormData === "string" ? inputFormData.trim() : "";

        if (input === optimisticText) return;

        setOptimisticText(input);

        if (input === "") {
            setOptimisticDelete(true);
            deleteBullet(formData);
        } else updateBullet(formData, bullet.text);
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
            <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
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
            <button
                onPointerDown={(e: PointerEvent<Element> | PointerEvent) => {
                    e.preventDefault();
                    controls.start(e);
                }}
                style={{ touchAction: "none" }}
                className="opacity-0 self-start group-focus-within:opacity-25 group-hover:opacity-50 transition-opacity cursor-move"
            >
                <RxDragHandleDots2 className="shrink-0 text-xl" />
            </button>
        </Reorder.Item>
    );
}
