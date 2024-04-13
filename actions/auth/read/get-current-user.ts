import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function getCurrentUser() {
    const actionName = "getCurrentUser";

    const supabase = createClient();

    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user)
        return actionError(actionName, { error: "Couldn't get current user" }, { redirectPath: "/login" });

    return actionSuccess(actionName, { user: user.user }, { log: false });
}
