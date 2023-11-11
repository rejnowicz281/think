"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return redirect("/login?message=Could not authenticate user");

    return redirect("/");
}

export async function signUp(formData) {
    const origin = headers().get("origin");
    const email = formData.get("email");
    const password = formData.get("password");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return redirect("/login?message=Could not authenticate user");

    return redirect("/login?message=Check email to continue sign in process");
}

export async function githubSignIn() {
    "use server";

    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return redirect("/login?message=Could not authenticate user");

    return redirect(data.url);
}

export async function signOut() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();

    return redirect("/login");
}
