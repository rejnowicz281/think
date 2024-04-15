"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type Bullet = {
    id: string;
    pos: number;
};

export default async function updateBulletsPos(bullets: Bullet[]) {
    const actionName = "updateBulletsPos";

    const supabase = createClient();

    const { error } = await supabase.from("bullets").upsert(bullets);

    if (error) return actionError(actionName, { error: error.message }, { revalidatePath: "/" });

    return actionSuccess(actionName, { bullets }, { revalidatePath: "/" });
}
