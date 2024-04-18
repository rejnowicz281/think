"use client";

import createBullet from "@/actions/journal/modify/create-bullet";
import useAuthContext from "@/providers/auth-provider";
import smallDeviceDetected from "@/utils/general/small-device-detected";
import { KeyboardEvent, useOptimistic, useRef, useState } from "react";
import BulletForm from "./bullet-form";

export default function NewBulletForm({ date, pos }: { date: string; pos: number }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);
    const { user } = useAuthContext();
    const [loading, setLoading] = useOptimistic(false);
    const [fullscreen, setFullscreen] = useState(false);

    function onSubmit() {
        setFullscreen(false);
    }

    function runSubmit() {
        if (submitRef.current && !loading) submitRef.current.click();
    }

    async function onAction(formData: FormData) {
        const inputFormData = formData.get("text");
        const input = typeof inputFormData === "string" ? inputFormData.trim() : "";

        if (input === "") return;

        setLoading(true);

        const res = await createBullet(formData);

        setLoading(false);

        if (res && textareaRef.current) textareaRef.current.value = "";
    }

    function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (fullscreen) return;

        const cleared = e.key === "Backspace" && e.currentTarget.selectionStart === 0;
        const leftArrowStart = e.key === "ArrowLeft" && e.currentTarget.selectionStart === 0;
        const enterShift = e.key === "Enter" && e.shiftKey;

        if (cleared || leftArrowStart) {
            e.preventDefault();
            const bulletParagraphs = e.currentTarget.parentElement?.previousElementSibling?.querySelectorAll(
                ".bullet"
            ) as NodeListOf<HTMLElement>;
            const lastBullet = bulletParagraphs[bulletParagraphs.length - 1];
            if (lastBullet) lastBullet.click();
        } else if (enterShift) {
            e.preventDefault();
            runSubmit();
        }
    }

    function onBlur() {
        return fullscreen ? undefined : runSubmit();
    }

    function onTextareaClick() {
        if (smallDeviceDetected()) setFullscreen(true);
    }

    return (
        <BulletForm
            date={date}
            pos={pos || 1}
            userId={user.id}
            textareaClassName="new-bullet-form-textarea"
            onBlur={onBlur}
            onSubmit={onSubmit}
            onAction={onAction}
            fullscreen={fullscreen}
            onKeyDown={onKeyDown}
            onTextareaClick={onTextareaClick}
            loading={loading}
            textareaRef={textareaRef}
            submitRef={submitRef}
        />
    );
}
