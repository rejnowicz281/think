"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
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

export async function createEntry(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const text = formData.get("text") || null;

    const { data: entry, error } = await supabase.from("entries").insert([{ text, user_id: user.id }]);

    if (error) {
        const data = {
            action: "createEntry",
            success: false,
            error,
        };
        console.error(data);
        return data;
    }

    revalidatePath("/entries");

    const data = {
        action: "createEntry",
        success: true,
    };
    console.log(data);
    return data;
}
