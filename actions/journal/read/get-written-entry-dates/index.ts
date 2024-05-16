import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export default async function getWrittenEntryDates(month: number, year: number) {
    const actionName = "getWrittenEntryDates";

    const supabase = createClient();

    const { data: dates, error } = await supabase.rpc("get_written_entry_dates", { month, year });

    if (error) return actionError(actionName, error);

    return actionSuccess(actionName, { dates }, { logData: false });
}
