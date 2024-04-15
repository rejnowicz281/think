"use client";

import createBullet from "@/actions/journal/modify/create-bullet";
import useAuthContext from "@/providers/auth-provider";
import { useRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import BulletIndicator from "./bullet-indicator";

export default function BulletForm({
    date,
    pos,
    placeholder = "Write something here...",
}: {
    date?: string;
    pos?: number;
    placeholder?: string;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);
    const { user } = useAuthContext();

    function handleSubmit() {
        if (submitRef.current) submitRef.current.click();
    }

    async function handleAction(formData: FormData) {
        const inputFormData = formData.get("text");
        const input = typeof inputFormData === "string" ? inputFormData.trim() : "";

        if (input === "") return;

        const res = await createBullet(formData);

        if (res && textareaRef.current) textareaRef.current.value = "";
    }

    return (
        <form className="flex-1 flex gap-2" action={handleAction}>
            <BulletIndicator />
            <input type="hidden" name="user_id" value={user.id} />
            {date && <input type="hidden" name="date" value={date} />}
            <input type="hidden" name="pos" value={pos || 1} />
            <ReactTextareaAutosize
                onFocus={(e) => {
                    const temp_value = e.target.value;
                    e.target.value = "";
                    e.target.value = temp_value;
                }}
                onBlur={handleSubmit}
                name="text"
                placeholder={placeholder}
                className="flex-1 bg-inherit outline-none resize-none overflow-hidden"
                ref={textareaRef}
            />

            <button type="submit" ref={submitRef} className="hidden"></button>
        </form>
    );
}