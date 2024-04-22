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

    const { data: bullets, error } = await supabase.rpc("get_bullets_from_date", { date_to_search: date });

    if (error) return actionError(actionName, { error: error.message });

    bullets?.sort((a: Bullet, b: Bullet) => a.pos - b.pos); // Sort bullets by pos

    bullets?.forEach((bullet: Bullet, idx: number) => (bullet.pos = idx)); // Update pos to match index (in case of missing bullets)

    return actionSuccess(actionName, { bullets }, { logData: false });
}
