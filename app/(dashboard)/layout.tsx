import Menubar from "@/components/menubar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 flex-col flex">
            <div className="relative flex-1">
                <div className="absolute overflow-y-auto inset-0 flex flex-col" id="main">
                    {children}
                </div>
            </div>
            <Menubar />
        </div>
    );
}
