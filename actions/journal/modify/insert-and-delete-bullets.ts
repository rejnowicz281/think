"use server";

import { Bullet } from "@/types/bullet";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

type Bullets = Omit<Bullet, "user_id" | "created_at" | "id">[];

export default async function insertAndDeleteBullets(bullets: Bullets, dateToDelete: string) {
    const actionName = "insertAndDeleteBullets";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "Invalid User" }, { redirectPath: "/login" });

    const formattedBullets = bullets.map((bullet) => ({
        ...bullet,
        user_id: user.id,
    }));

    const [{ error: insertError }, { error: deleteError }] = await Promise.all([
        supabase.from("bullets").insert(formattedBullets),
        supabase.from("bullets").delete().eq("date", dateToDelete),
    ]);

    if (insertError || deleteError)
        return actionError(
            actionName,
            { error: insertError?.message || deleteError?.message },
            { revalidatePath: "/" }
        );

    return actionSuccess(actionName, {}, { revalidatePath: "/" });
}
