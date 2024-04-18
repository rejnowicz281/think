"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { DragControls } from "framer-motion";
import { FocusEvent, FormEvent, KeyboardEvent } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import BulletIndicator from "./bullet-indicator";

export default function BulletForm({
    date,
    pos,
    bulletId,
    userId,
    textareaClassName,
    placeholder = "Write something here...",
    onFocus,
    textareaId,
    defaultTextareaValue,
    fullscreen,
    onSubmit,
    onAction,
    onKeyDown,
    onBlur,
    onTextareaClick,
    loading,
    textareaRef,
    submitRef,
    controls,
}: {
    controls?: DragControls;
    bulletId?: string;
    userId?: string;
    onBlur?: (e: FocusEvent<HTMLTextAreaElement, Element>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    onTextareaClick?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void;
    onFocus?: (e: FocusEvent<HTMLTextAreaElement, Element>) => void;
    onAction: (formData: FormData) => void;
    fullscreen: boolean;
    defaultTextareaValue?: string;
    textareaId?: string;
    textareaClassName?: string;
    date?: string;
    pos?: number;
    placeholder?: string;
    loading: boolean;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    submitRef: React.RefObject<HTMLButtonElement>;
}) {
    return (
        <div
            className={clsx(
                fullscreen && "fixed inset-0 z-10 dark:bg-[#121212] bg-white sm:static sm:z-0",
                "flex-1 flex flex-col"
            )}
        >
            <form className="flex-1 flex flex-col" onSubmit={onSubmit} action={onAction}>
                {userId && <input type="hidden" name="user_id" value={userId} />}
                {date && <input type="hidden" name="date" value={date} />}
                {pos && <input type="hidden" name="pos" value={pos} />}
                {bulletId && <input type="hidden" name="id" value={bulletId} />}
                <div className="flex flex-1 gap-2">
                    <div className={clsx(fullscreen && "p-4 pr-0 sm:p-0")}>
                        <BulletIndicator loading={loading} controls={controls} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <ReactTextareaAutosize
                            onFocus={onFocus}
                            onKeyDown={onKeyDown}
                            onBlur={onBlur}
                            name="text"
                            placeholder={placeholder}
                            className={clsx(
                                textareaClassName,
                                fullscreen ? "basis-full p-4 pl-0 sm:p-0" : "overflow-hidden",
                                "sm:overflow-hidden sm:basis-auto bg-inherit outline-none leading-relaxed resize-none"
                            )}
                            defaultValue={defaultTextareaValue}
                            id={textareaId}
                            ref={textareaRef}
                            onClick={onTextareaClick}
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
