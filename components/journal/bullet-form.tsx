"use client";

import createBullet from "@/actions/journal/modify/create-bullet";
import { Button } from "@/components/ui/button";
import useAuthContext from "@/providers/auth-provider";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { useRef } from "react";
import SubmitButton from "../general/submit-button";
import { Textarea } from "../ui/textarea";

export default function BulletForm({
    date,
    pos,
    placeholder = "Add a new bullet",
}: {
    date?: string;
    pos?: number;
    placeholder?: string;
}) {
    const { user } = useAuthContext();
    const formRef = useRef<HTMLFormElement>(null);

    async function handleAction(formData: FormData) {
        const textFormData = formData.get("text");
        const text = typeof textFormData === "string" ? textFormData.trim() : null;

        if (!text) return;

        const res = await createBullet(formData);

        if (formRef.current && res.success) formRef.current.reset();
    }

    return (
        <form ref={formRef} className="flex flex-col gap-2" action={handleAction}>
            <input type="hidden" name="user_id" value={user.id} />
            {date && <input type="hidden" name="date" value={date} />}
            <input type="hidden" name="pos" value={pos || 1} />

            <Textarea name="text" placeholder={placeholder} />

            <Button variant="outline" asChild>
                <SubmitButton content="Save" loading={<VscLoading className="h-4 w-4 animate-spin" />} />
            </Button>
        </form>
    );
}
