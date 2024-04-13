"use client";

import createBullet from "@/actions/entries/modify/create-bullet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthContext from "@/providers/auth-provider";
import { MdKeyboardArrowDown } from "@react-icons/all-files/md/MdKeyboardArrowDown";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { useRef } from "react";
import SubmitButton from "../general/submit-button";

export default function BulletForm() {
    const { user } = useAuthContext();
    const formRef = useRef<HTMLFormElement>(null);

    async function handleAction(formData: FormData) {
        const textFormData = formData.get("text");
        const userIdFormData = formData.get("user_id");

        const text = typeof textFormData === "string" ? textFormData.trim() : null;
        const userId = typeof userIdFormData === "string" ? userIdFormData.trim() : null;

        if (!text || !userId) return;

        await createBullet(formData);

        if (formRef.current) formRef.current.reset();
    }

    return (
        <form ref={formRef} className="flex flex-col gap-2" action={handleAction}>
            <input type="hidden" name="user_id" value={user.id} />

            <Input type="text" name="text" placeholder="Add a new bullet" />

            <Button variant="outline" asChild>
                <SubmitButton
                    content={<MdKeyboardArrowDown className="w-6 h-6" />}
                    loading={<VscLoading className="h-4 w-4 animate-spin" />}
                />
            </Button>
        </form>
    );
}
