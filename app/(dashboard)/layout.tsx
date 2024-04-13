import signOut from "@/actions/auth/modify/sign-out";
import getCurrentUser from "@/actions/auth/read/get-current-user";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { AuthProvider } from "@/providers/auth-provider";
import Link from "next/link";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <div className="flex-1 flex-col flex">
                <div className="relative flex-1">
                    <div className="absolute overflow-y-auto inset-0 flex flex-col">{children}</div>
                </div>
                <div className="flex justify-between bg-zinc-900 border-t border-t-neutral-300 dark:border-t-neutral-800 p-2">
                    <div className="flex">
                        <Button asChild variant="ghost">
                            <Link href="/entries">Entries</Link>
                        </Button>
                    </div>
                    <form action={signOut}>
                        <Button asChild variant="ghost">
                            <SubmitButton content="Sign Out" />
                        </Button>
                    </form>
                </div>
            </div>
        </AuthProvider>
    );
}
