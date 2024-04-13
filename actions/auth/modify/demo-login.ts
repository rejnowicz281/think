"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function demoLogin() {
    const actionName = "demoLogin";

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: "demo@demo.demo",
        password: "123456",
    });

    if (error) return actionError(actionName, {}, { redirectPath: "/login?error=Could not authenticate user" });

    return actionSuccess(actionName, {}, { redirectPath: "/" });
}
