import { ActionResponse } from "@/types/action-response";
import { Bullet } from "@/types/bullet";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function getDateBullets(
    date: string
): Promise<ActionResponse & { bullets?: Bullet[]; error?: string }> {
    const actionName = "getDateBullets";

    const supabase = createClient();

    const formattedDate = new Date(date).toISOString().split("T")[0];

    const { data: bullets, error } = await supabase.rpc("get_bullets_from_date", { date_to_search: formattedDate });

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { bullets }, { logData: false });
}
