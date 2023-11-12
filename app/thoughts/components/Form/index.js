"use client";

import { createThought } from "@/actions/thoughts";
import { useRef } from "react";

export default function Form() {
    const formRef = useRef(null);

    async function handleAction(formData) {
        const res = await createThought(formData);
        if (res.success) formRef.current.reset();
    }

    return (
        <form action={handleAction} ref={formRef}>
            <input type="text" name="text" placeholder="New Thought"></input>
            <textarea name="description" placeholder="Explain this thought"></textarea>
            <button>Submit</button>
        </form>
    );
}
