"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getEntries() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: entries, error } = await supabase.from("entries").select("*");

    return entries;
}

export async function getEntry(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: entry, error } = await supabase.from("entries").select("*").eq("id", id).single();

    return entry;
}
