"use server";

import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function signOut() {
    const actionName = "signOut";

    const supabase = createClient();

    await supabase.auth.signOut();

    return actionSuccess(actionName, {}, { redirectPath: "/login" });
}
