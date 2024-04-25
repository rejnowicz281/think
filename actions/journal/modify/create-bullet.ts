"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function createBullet(formData: FormData) {
    const actionName = "createBullet";

    const supabase = createClient();

    const textFormData = formData.get("text");
    const dateFormData = formData.get("date");
    const posFormData = formData.get("pos");

    const text = typeof textFormData === "string" ? textFormData.trim() : null;
    const date =
        typeof dateFormData === "string"
            ? new Date(dateFormData).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0];
    const pos = typeof posFormData === "string" ? parseInt(posFormData) : null;

    const posIsInvalid = !pos || pos < 0;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!text || !user || posIsInvalid) return actionError(actionName, { error: "Invalid Form Data" });

    const { error } = await supabase.from("bullets").insert({
        text,
        user_id: user.id,
        pos,
        date,
    });

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { text }, { revalidatePath: "/" });
}
