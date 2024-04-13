"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function deleteBullet(formData: FormData) {
    const actionName = "deleteBullet";

    const supabase = createClient();

    const id = formData.get("id");

    const { error } = await supabase.from("bullets").delete().eq("id", id);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { id }, { revalidatePath: "/" });
}
