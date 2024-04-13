import { ActionResponse } from "@/types/action-response";
import { Bullet } from "@/types/bullet";
import { Entries } from "@/types/entry";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function getAllEntries(): Promise<ActionResponse & { entries?: Entries; error?: string }> {
    const actionName = "getAllEntries";

    const supabase = createClient();

    const { data: bullets, error } = await supabase.from("bullets").select("*").order("date", { ascending: false });

    if (error) return actionError(actionName, { error: error.message });

    // Group bullets by date
    const entries = bullets.reduce((acc, bullet) => {
        const date = bullet.date;
        if (!acc[date]) acc[date] = [];

        acc[date].push(bullet);

        return acc;
    }, {});

    // Sort bullets by position
    Object.keys(entries).forEach((date) => {
        entries[date].sort((a: Bullet, b: Bullet) => a.pos - b.pos);
    });

    return actionSuccess(actionName, { entries }, { logData: false });
}
