"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getThoughts() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: thoughts, error } = await supabase.from("thoughts").select("*");

    return thoughts;
}

export async function getThought(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: thought, error } = await supabase.from("thoughts").select("*").eq("id", id).single();

    return thought;
}

export async function createThought(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const text = formData.get("text") || null;
    const description = formData.get("description") || null;
    const entry_id =
        formData.get("entry_id") ||
        (await supabase.from("entries").select("*").order("date", { ascending: false }).limit(1)).data[0]?.id ||
        null;
    // if no entry_id is provided, get the most recent entry and use its id, or null if no entries exist

    const { data: entry, error } = await supabase
        .from("thoughts")
        .insert([{ text, description, user_id: user.id, entry_id }]);

    if (error) {
        const data = {
            action: "createThought",
            success: false,
            error,
        };
        console.error(data);
        return data;
    }

    revalidatePath("/thoughts");

    const data = {
        action: "createThought",
        success: true,
    };
    console.log(data);
    return data;
}
