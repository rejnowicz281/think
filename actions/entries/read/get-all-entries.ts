"use server";

import { ActionResponse } from "@/types/action-response";
import { Entries } from "@/types/entry";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function getAllEntries(): Promise<ActionResponse & { entries?: Entries; error?: string }> {
    const actionName = "getAllEntries";

    const supabase = createClient();

    const { data: bullets, error } = await supabase
        .from("bullets")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) return actionError(actionName, { error: error.message });

    const entries = bullets.reduce((acc, bullet) => {
        const date = new Date(bullet.created_at).toLocaleDateString();

        if (!acc[date]) acc[date] = [];

        acc[date].push(bullet);

        return acc;
    }, {});

    return actionSuccess(actionName, { entries }, { logData: true });
}
