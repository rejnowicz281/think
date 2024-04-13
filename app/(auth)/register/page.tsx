import RegisterContainer from "@/components/auth/register-container";
import { Button } from "@/components/ui/button";
import { FaThinkPeaks } from "@react-icons/all-files/fa6/FaThinkPeaks";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex-1 flex flex-col sm:flex-col-reverse">
            <div className="p-4 flex-1 flex flex-col">
                <RegisterContainer />
            </div>
            <div className="sm:p-4 flex justify-between items-center">
                <div className="hidden sm:flex gap-3 text-3xl items-center">
                    <FaThinkPeaks />
                    <h1 className="tracking-widest">think</h1>
                </div>
                <Button
                    asChild
                    variant="ghost"
                    className="text-xl border-t border-t-neutral-300 dark:border-t-neutral-800 sm:border-t-0 rounded-none sm:rounded-md flex-1 h-12 sm:h-10 sm:flex-initial"
                >
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        </div>
    );
}
