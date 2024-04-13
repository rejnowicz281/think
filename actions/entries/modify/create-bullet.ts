"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function createBullet(formData: FormData) {
    const actionName = "createBullet";

    const supabase = createClient();

    const textFormData = formData.get("text");
    const userIdFormData = formData.get("user_id");

    const text = typeof textFormData === "string" ? textFormData.trim() : null;
    const user_id = typeof userIdFormData === "string" ? userIdFormData.trim() : null;

    if (!text || !user_id) return actionError(actionName, { error: "Invalid Form Data" });

    const { error } = await supabase.from("bullets").insert({ text, user_id });

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { text }, { revalidatePath: "/entries" });
}
