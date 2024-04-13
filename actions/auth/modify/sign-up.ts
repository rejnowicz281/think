"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export default async function signUp(formData: FormData) {
    const actionName = "signUp";

    const emailFormData = formData.get("email");
    const passwordFormData = formData.get("password");

    const email = typeof emailFormData === "string" ? emailFormData.trim() : null;
    const password = typeof passwordFormData === "string" ? passwordFormData.trim() : null;

    const origin = headers().get("origin");

    const supabase = createClient();

    const queryParams = new URLSearchParams();

    if (!email) queryParams.append("email-error", "Email is required");
    else if (!email.includes("@")) queryParams.append("email-error", "Email must be valid");

    if (!password) queryParams.append("password-error", "Password is required");
    else if (password.length < 6) queryParams.append("password-error", "Password must be at least 6 characters");

    const queryParamsString = queryParams.toString();

    if (queryParamsString)
        return actionError(actionName, { queryParams }, { redirectPath: `/register?${queryParamsString}` });

    const { error } = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return actionError(actionName, { error }, { redirectPath: `/register?error=${error.message}` });

    return actionSuccess(actionName, {}, { redirectPath: "/" });
}
