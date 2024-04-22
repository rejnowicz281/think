import deleteBullet from "@/actions/journal/modify/delete-bullet";
import updateBullet from "@/actions/journal/modify/update-bullet";
import BulletForm from "@/components/journal/bullet-form";
import { Bullet } from "@/types/bullet";
import smallDeviceDetected from "@/utils/general/small-device-detected";
import { DragControls } from "framer-motion";
import { FocusEvent, KeyboardEvent, useEffect, useRef } from "react";

export default function EditableBulletForm({
    setLoading,
    setEditing,
    editing,
    optimisticText,
    setOptimisticText,
    setOptimisticDelete,
    bullet,
    loading,
    controls,
}: {
    loading: boolean;
    controls?: DragControls;
    setLoading: (loading: boolean) => void;
    setEditing: (editing: boolean) => void;
    editing: boolean;
    optimisticText: string;
    setOptimisticText: (text: string) => void;
    setOptimisticDelete: (deleteBullet: boolean) => void;
    bullet: Bullet;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const fullscreen = smallDeviceDetected() && editing;

    useEffect(() => {
        if (textareaRef.current) textareaRef.current.value = optimisticText;
    }, [optimisticText]);

    useEffect(() => {
        if (editing && textareaRef.current) textareaRef.current.focus({ preventScroll: true });
    }, [editing]);

    function onFocus(e: FocusEvent<HTMLTextAreaElement, Element>) {
        const temp_value = e.target.value;
        e.target.value = "";
        e.target.value = temp_value;

        if (fullscreen) {
            e.target.scrollTo({ top: e.target.scrollHeight, behavior: "smooth" });
            return;
        }

        const main = document.getElementById("main");

        if (main) {
            const textareaRect = e.target.getBoundingClientRect();
            const mainRect = main.getBoundingClientRect();

            // Check if the textarea is out of the viewport
            if (textareaRect.bottom + 80 > mainRect.bottom || textareaRect.top - 80 < mainRect.top) {
                // Calculate the position to scroll to, so that the bottom of the main element aligns with the bottom of the textarea, with a little padding
                const position = main.scrollTop + textareaRect.bottom + 80 - mainRect.bottom;

                // Scroll to the calculated position
                main.scrollTo({ top: position, behavior: "smooth" });
            }
        }
    }

    function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (fullscreen) return;

        const cleared = e.currentTarget.value === "";
        const backspaceStart = e.key === "Backspace" && e.currentTarget.selectionStart === 0;
        const leftArrowStart = e.key === "ArrowLeft" && e.currentTarget.selectionStart === 0;
        const rightArrowEnd = e.key === "ArrowRight" && e.currentTarget.selectionStart === e.currentTarget.value.length;
        const enterShift = e.key === "Enter" && e.shiftKey;

        const goToNextBullet = () => {
            e.preventDefault();

            const nextBulletSibling =
                e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
                    ?.nextElementSibling;

            if (nextBulletSibling) {
                const nextBullet = nextBulletSibling.querySelector(".bullet") as HTMLElement;

                if (nextBullet) nextBullet.click();
            } else {
                const bulletForm = document.querySelector(".new-bullet-form-textarea") as HTMLElement;

                if (bulletForm) bulletForm.focus();
            }
        };

        if (backspaceStart || leftArrowStart) {
            e.preventDefault();

            const prevBullet =
                e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.previousElementSibling?.querySelector(
                    ".bullet"
                ) as HTMLElement;

            if (prevBullet) prevBullet.click();
            else if (cleared) goToNextBullet();
        } else if (rightArrowEnd) goToNextBullet();
        else if (enterShift) runSubmit();
    }

    function runSubmit() {
        if (submitRef.current) submitRef.current.click();
    }

    async function onAction(formData: FormData) {
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

    return (
        <BulletForm
            controls={controls}
            bulletId={bullet.id}
            textareaClassName="bullet"
            onSubmit={() => setEditing(false)}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onBlur={runSubmit}
            onAction={onAction}
            fullscreen={fullscreen}
            placeholder=""
            defaultTextareaValue={optimisticText}
            loading={loading}
            textareaRef={textareaRef}
            submitRef={submitRef}
        />
    );
}
