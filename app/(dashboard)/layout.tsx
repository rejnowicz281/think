import signOut from "@/actions/auth/modify/sign-out";
import getCurrentUser from "@/actions/auth/read/get-current-user";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { AuthProvider } from "@/providers/auth-provider";
import { IoJournalOutline } from "@react-icons/all-files/io5/IoJournalOutline";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";
import { PiNotePencil } from "@react-icons/all-files/pi/PiNotePencil";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
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
                <div className="flex items-center justify-center bg-zinc-900 border-t border-t-neutral-300 dark:border-t-neutral-800 p-2">
                    <Button asChild variant="ghost">
                        <Link href={`/journal/today`}>
                            <PiNotePencil className="w-6 h-6" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/">
                            <IoJournalOutline className="w-6 h-6" />
                        </Link>
                    </Button>

                    <form action={signOut}>
                        <Button asChild variant="ghost">
                            <SubmitButton
                                content={<IoLogOutOutline className="w-6 h-6" />}
                                loading={<VscLoading className="w-6 h-6 animate-spin" />}
                            />
                        </Button>
                    </form>
                </div>
            </div>
        </AuthProvider>
    );
}
