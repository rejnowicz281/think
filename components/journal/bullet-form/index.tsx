"use client";

import createBullet from "@/actions/journal/modify/create-bullet";
import { Button } from "@/components/ui/button";
import useAuthContext from "@/providers/auth-provider";
import smallDeviceDetected from "@/utils/general/small-device-detected";
import clsx from "clsx";
import { useOptimistic, useRef, useState } from "react";
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
    const [fullscreen, setFullscreen] = useState(false);

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
        <div
            className={clsx(
                fullscreen && "fixed inset-0 z-10 dark:bg-[#121212] bg-white sm:static sm:z-0",
                "flex gap-2"
            )}
        >
            <form className="flex-1 flex flex-col" onSubmit={() => setFullscreen(false)} action={handleAction}>
                <input type="hidden" name="user_id" value={user.id} />
                {date && <input type="hidden" name="date" value={date} />}
                <input type="hidden" name="pos" value={pos || 1} />
                <div className="flex flex-1 gap-2">
                    <div className={clsx(fullscreen && "p-4 pr-0 sm:p-0")}>
                        <BulletIndicator loading={loading} />
                    </div>
                    <div className="flex flex-col flex-1">
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
                            onBlur={fullscreen ? undefined : handleSubmit}
                            name="text"
                            placeholder={placeholder}
                            className={clsx(
                                fullscreen ? "basis-full p-4 pl-0 sm:p-0" : "overflow-hidden",
                                "sm:overflow-hidden sm:basis-auto new-bullet-form bg-inherit outline-none resize-none"
                            )}
                            ref={textareaRef}
                            onClick={() => {
                                if (smallDeviceDetected()) setFullscreen(true);
                            }}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    ref={submitRef}
                    variant="ghost"
                    className={clsx(
                        !fullscreen && "hidden",
                        "sm:hidden border-t rounded-none dark:border-t-neutral-800 border-t-neutral-300"
                    )}
                >
                    Save
                </Button>
            </form>
        </div>
    );
}
