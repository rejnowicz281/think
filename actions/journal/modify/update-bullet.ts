"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function updateBullet(formData: FormData, oldText: string) {
    const actionName = "updateBullet";

    const supabase = createClient();

    const textFormData = formData.get("text");
    const idFormData = formData.get("id");
    const posFormData = formData.get("pos");

    const text = typeof textFormData === "string" ? textFormData.trim() : null;
    const pos = typeof posFormData === "string" ? parseInt(posFormData) : null;
    const id = typeof idFormData === "string" ? idFormData.trim() : null;

    if (text === oldText) return actionSuccess(actionName, { text });

    if (!id || (!text && !pos)) return actionError(actionName, { error: "Invalid Form Data" }, { revalidatePath: "/" });

    const updateData: {
        text?: string;
        pos?: number;
    } = {};

    if (text) updateData.text = text;
    if (pos) updateData.pos = pos;

    const { error } = await supabase.from("bullets").update(updateData).eq("id", id);

    if (error) return actionError(actionName, { error: error.message }, { revalidatePath: "/" });

    return actionSuccess(actionName, { text }, { revalidatePath: "/" });
}
