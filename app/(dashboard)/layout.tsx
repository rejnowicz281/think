import getCurrentUser from "@/actions/auth/read/get-current-user";
import Menubar from "@/components/menubar";
import { AuthProvider } from "@/providers/auth-provider";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <div className="flex-1 flex-col flex">
                <div className="relative flex-1">
                    <div className="absolute overflow-y-auto inset-0 flex flex-col">{children}</div>
                </div>
                <Menubar />
            </div>
        </AuthProvider>
    );
}
