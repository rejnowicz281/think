"use client";

import deleteBullet from "@/actions/journal/modify/delete-bullet";
import updateBullet from "@/actions/journal/modify/update-bullet";
import { Bullet } from "@/types/bullet";
import { useEffect, useOptimistic, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function EditableBullet({ bullet }: { bullet: Bullet; editable?: boolean }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);
    const [optimisticText, setOptimisticText] = useOptimistic(bullet.text);
    const [optimisticDelete, setOptimisticDelete] = useOptimistic(false);
    const [editing, setEditing] = useState(false);

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
        } else updateBullet(formData, bullet);
    }

    if (optimisticDelete) return null;

    return (
        <div className="flex gap-2">
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
                        className="bg-inherit outline-none resize-none overflow-hidden"
                        ref={textareaRef}
                    />

                    <button type="submit" ref={submitRef} className="hidden"></button>
                </form>
            ) : (
                <p onClick={() => setEditing(true)} className="cursor-text flex-1 word-break whitespace-pre-line">
                    {optimisticText}
                </p>
            )}
        </div>
    );
}
