"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function createBullet(formData: FormData) {
    const actionName = "createBullet";

    const supabase = createClient();

    const textFormData = formData.get("text");
    const userIdFormData = formData.get("user_id");
    const dateFormData = formData.get("date");
    const posFormData = formData.get("pos");

    const text = typeof textFormData === "string" ? textFormData.trim() : null;
    const user_id = typeof userIdFormData === "string" ? userIdFormData.trim() : null;
    const date =
        typeof dateFormData === "string"
            ? new Date(dateFormData).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0];
    const pos = typeof posFormData === "string" ? parseInt(posFormData) : null;

    const posIsInvalid = !pos || pos < 0;

    if (!text || !user_id || posIsInvalid) return actionError(actionName, { error: "Invalid Form Data" });

    const { error } = await supabase.from("bullets").insert({
        text,
        user_id,
        pos,
        date,
    });

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { text }, { revalidatePath: "/" });
}
