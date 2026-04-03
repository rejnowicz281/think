"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";

export default async function deleteAccount() {
    const actionName = "deleteAccount";

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    const {
        data: { user },
        error: userError
    } = await createServerClient().auth.getUser();

    if (userError || !user) {
        actionError(actionName, { error: "Must be logged in to proceed" });
        return;
    }

    const email = user.email;

    if (email === "demo@demo.demo") {
        actionError(actionName, { error: "You cannot delete this demo account." });
        return;
    }

    const id = user.id;

    const { error } = await supabase.auth.admin.deleteUser(id);

    if (error) {
        actionError(actionName, { error });
        return;
    }

    await supabase.auth.signOut();

    actionSuccess(actionName, { id }, { redirectPath: "/login" });
}
