"use client";

import createBullet from "@/actions/journal/modify/create-bullet";
import useAuthContext from "@/providers/auth-provider";
import smallDeviceDetected from "@/utils/general/small-device-detected";
import { KeyboardEvent, useOptimistic, useRef, useState } from "react";
import BulletContainer from "./bullet-container";
import BulletForm from "./bullet-form";

export default function NewBulletForm({ date, pos, placeholder }: { date: string; pos: number; placeholder?: string }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);
    const { user } = useAuthContext();
    const [fullscreen, setFullscreen] = useState(false);
    const [optimisticBullets, setOptimisticBullets] = useOptimistic<string[]>([]);

    function onSubmit() {
        setFullscreen(false);
    }

    function runSubmit() {
        if (submitRef.current) submitRef.current.click();
    }

    async function onAction(formData: FormData) {
        const inputFormData = formData.get("text");
        const input = typeof inputFormData === "string" ? inputFormData.trim() : "";

        if (input === "") return;

        setOptimisticBullets((prev) => [...prev, input]);

        createBullet(formData);

        if (textareaRef.current) textareaRef.current.value = "";
    }

    function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (fullscreen) return;

        const cleared = e.key === "Backspace" && e.currentTarget.selectionStart === 0;
        const leftArrowStart = e.key === "ArrowLeft" && e.currentTarget.selectionStart === 0;
        const enterShift = e.key === "Enter" && e.shiftKey;

        if (cleared || leftArrowStart) {
            e.preventDefault();
            const bullets = document.querySelectorAll(".bullet") as NodeListOf<HTMLElement>;
            const lastBullet = bullets[bullets.length - 1];
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
        <>
            {optimisticBullets.map((text, i) => (
                <BulletContainer key={i} text={text} loading={true} />
            ))}
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
                placeholder={placeholder}
                onTextareaClick={onTextareaClick}
                textareaRef={textareaRef}
                submitRef={submitRef}
            />
        </>
    );
}
