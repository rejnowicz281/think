import { signOut } from "@/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user ? (
        <div className="flex items-center gap-4">
            Hey, {user.email}!
            <div>
                <Link href="/entries">Go to Entries</Link>
            </div>
            <form action={signOut}>
                <button>Logout</button>
            </form>
        </div>
    ) : (
        <div>
            <h1>think</h1>
            <Link href="/login">Login</Link>
        </div>
    );
}