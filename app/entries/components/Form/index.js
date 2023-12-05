"use client";

import { createEntry } from "@/actions/entries";
import { useRef } from "react";

export default function Form() {
    const formRef = useRef(null);

    async function handleAction(formData) {
        const res = await createEntry(formData);
        if (res.success) formRef.current.reset();
    }

    return (
        <form action={handleAction} ref={formRef}>
            <input type="date" name="date" />
            <button>Create Entry</button>
        </form>
    );
}
