"use client";

import { addBullet } from "@/actions/entries";
import { useRef } from "react";

export default function Form({ id }) {
    const formRef = useRef(null);

    async function handleAction(formData) {
        const res = await addBullet(formData);
        if (res.success) formRef.current.reset();
    }

    return (
        <form action={handleAction} ref={formRef}>
            <input type="hidden" name="entry_id" value={id} />
            <textarea name="text" placeholder="Write here..."></textarea>
            <button>Add Bullet</button>
        </form>
    );
}
