"use server";

import { ActionResponse } from "@/types/action-response";
import { Bullet } from "@/types/bullet";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

type BulletsActionResponse = ActionResponse & {
    bullets?: Bullet[];
};

export default async function getFilteredBullets(filter: string): Promise<BulletsActionResponse> {
    const actionName = "getFilteredBullets";

    const supabase = createClient();

    const { data: bullets, error } = await supabase
        .from("bullets")
        .select("*")
        .like("text", `%${filter}%`)
        .order("date", { ascending: false });

    if (error) return actionError(actionName, error);

    return actionSuccess(actionName, { bullets }, { logData: false });
}
