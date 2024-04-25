"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function deleteEntry(formData: FormData) {
    const actionName = "deleteEntry";

    const supabase = createClient();

    const date = formData.get("date");

    const { error } = await supabase.from("bullets").delete().eq("date", date);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { date }, { revalidatePath: "/" });
}
