"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getEntries() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: entries, error } = await supabase.from("entries").select("*").order("date", { ascending: false });

    return entries;
}

export async function getEntry(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const [entryData, thoughtsData] = await Promise.all([
        supabase.from("entries").select("*").eq("id", id).single(),
        supabase.from("thoughts").select("*").eq("entry_id", id),
    ]);

    const entry = {
        ...entryData.data,
        thoughts: thoughtsData.data,
    };

    return entry;
}

export async function createEntry(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const date = formData.get("date") || null;

    const { data: entry, error } = await supabase.from("entries").insert([{ date, user_id: user.id }]);

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

export async function addBullet(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const text = formData.get("text") || null;
    const entry_id = formData.get("entry_id") || null;

    const { data: entry, error } = await supabase.rpc("add_bullet", {
        text,
        entry_id,
    });

    if (error) {
        const data = {
            action: "addBullet",
            success: false,
            error,
        };
        console.error(data);
        return data;
    }

    revalidatePath(`/entries/${entry_id}`);

    const data = {
        action: "addBullet",
        success: true,
    };
    console.log(data);
    return data;
}
