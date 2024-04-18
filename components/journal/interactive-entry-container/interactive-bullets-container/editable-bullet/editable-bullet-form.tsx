import deleteBullet from "@/actions/journal/modify/delete-bullet";
import updateBullet from "@/actions/journal/modify/update-bullet";
import { Bullet } from "@/types/bullet";
import { useEffect, useRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function EditableBulletForm({
    setLoading,
    setEditing,
    editing,
    optimisticText,
    setOptimisticText,
    setOptimisticDelete,
    bullet,
}: {
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

    useEffect(() => {
        if (textareaRef.current) textareaRef.current.value = optimisticText;
    }, [optimisticText]);

    useEffect(() => {
        if (editing && textareaRef.current) textareaRef.current.focus({ preventScroll: true });
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

    return (
        <form className="flex-1 flex flex-col" action={handleAction}>
            <input type="hidden" name="id" value={bullet.id} />
            <ReactTextareaAutosize
                onFocus={(e) => {
                    const temp_value = e.target.value;
                    e.target.value = "";
                    e.target.value = temp_value;

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
                }}
                onKeyDown={(e) => {
                    const cleared = e.currentTarget.value === "";
                    const backspaceStart = e.key === "Backspace" && e.currentTarget.selectionStart === 0;
                    const leftArrowStart = e.key === "ArrowLeft" && e.currentTarget.selectionStart === 0;
                    const rightArrowEnd =
                        e.key === "ArrowRight" && e.currentTarget.selectionStart === e.currentTarget.value.length;
                    const enterShift = e.key === "Enter" && e.shiftKey;

                    const goToNextBullet = () => {
                        e.preventDefault();

                        const nextBulletSibling = e.currentTarget.parentElement?.parentElement?.nextElementSibling;

                        if (nextBulletSibling) {
                            const nextBullet = nextBulletSibling.querySelector(".bullet") as HTMLElement;

                            if (nextBullet) nextBullet.click();
                        } else {
                            const bulletForm = document.querySelector(".new-bullet-form") as HTMLElement;

                            if (bulletForm) bulletForm.focus();
                        }
                    };

                    if (backspaceStart || leftArrowStart) {
                        e.preventDefault();

                        const prevBullet =
                            e.currentTarget.parentElement?.parentElement?.previousElementSibling?.querySelector(
                                ".bullet"
                            ) as HTMLElement;

                        if (prevBullet) prevBullet.click();
                        else if (cleared) goToNextBullet();
                    } else if (rightArrowEnd) goToNextBullet();
                    else if (enterShift) handleSubmit();
                }}
                onBlur={handleSubmit}
                id={`text-${bullet.id}`}
                name="text"
                defaultValue={optimisticText}
                className="bg-inherit outline-none resize-none overflow-hidden leading-relaxed"
                ref={textareaRef}
            />

            <button type="submit" ref={submitRef} className="hidden"></button>
        </form>
    );
}
