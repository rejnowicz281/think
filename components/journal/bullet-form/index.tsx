"use client";

import createBullet from "@/actions/journal/modify/create-bullet";
import useAuthContext from "@/providers/auth-provider";
import { useOptimistic, useRef } from "react";
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
    const [loading, setLoading] = useOptimistic(false);

    function handleSubmit() {
        if (submitRef.current && !loading) submitRef.current.click();
    }

    async function handleAction(formData: FormData) {
        const inputFormData = formData.get("text");
        const input = typeof inputFormData === "string" ? inputFormData.trim() : "";

        if (input === "") return;

        setLoading(true);

        const res = await createBullet(formData);

        setLoading(false);

        if (res && textareaRef.current) textareaRef.current.value = "";
    }

    return (
        <div className="flex gap-2">
            <BulletIndicator loading={loading} />
            <form className="flex-1 flex gap-2" action={handleAction}>
                <input type="hidden" name="user_id" value={user.id} />
                {date && <input type="hidden" name="date" value={date} />}
                <input type="hidden" name="pos" value={pos || 1} />
                <ReactTextareaAutosize
                    onKeyDown={(e) => {
                        const cleared = e.key === "Backspace" && e.currentTarget.selectionStart === 0;
                        const leftArrowStart = e.key === "ArrowLeft" && e.currentTarget.selectionStart === 0;
                        const enterShift = e.key === "Enter" && e.shiftKey;
                        if (cleared || leftArrowStart) {
                            e.preventDefault();
                            const bulletParagraphs =
                                e.currentTarget.parentElement?.previousElementSibling?.querySelectorAll(
                                    ".bullet"
                                ) as NodeListOf<HTMLElement>;
                            const lastBullet = bulletParagraphs[bulletParagraphs.length - 1];
                            if (lastBullet) lastBullet.click();
                        } else if (enterShift) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                    onFocus={(e) => {
                        const temp_value = e.target.value;
                        e.target.value = "";
                        e.target.value = temp_value;
                    }}
                    onBlur={handleSubmit}
                    name="text"
                    placeholder={placeholder}
                    className="new-bullet-form flex-1 bg-inherit outline-none resize-none overflow-hidden"
                    ref={textareaRef}
                />
                <button type="submit" ref={submitRef} className="hidden"></button>
            </form>
        </div>
    );
}
