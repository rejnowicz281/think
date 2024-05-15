import Menubar from "@/components/menubar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 md:flex-row-reverse flex-col flex">
            <div className="relative flex-1">
                <div className="absolute overflow-y-auto inset-0 flex flex-col" id="main">
                    {children}
                </div>
            </div>

            <div className="md:basis-[80px] md:relative flex-col flex">
                <div className="md:absolute md:overflow-y-auto md:inset-0 flex flex-col">
                    <Menubar />
                </div>
            </div>
        </div>
    );
}
