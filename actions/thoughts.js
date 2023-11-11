"use server";

import { createClient } from "@/utils/supabase/server";
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
