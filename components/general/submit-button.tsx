"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
    className?: string;
    content: ReactNode | string;
    loading?: ReactNode | string;
    formAction?: (formData: FormData) => void;
};

export default function SubmitButton({ className, content, loading, formAction }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    // if loading is a string, it will be used as the loading text, otherwise 'content' will always be used
    return (
        <button formAction={formAction} className={className} disabled={pending} type="submit">
            {loading ? (pending ? loading : content) : content}
        </button>
    );
}
