import signOut from "@/actions/auth/modify/sign-out";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { IoJournalOutline } from "@react-icons/all-files/io5/IoJournalOutline";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";
import { MdOutlineSettings } from "@react-icons/all-files/md/MdOutlineSettings";
import { PiNotePencil } from "@react-icons/all-files/pi/PiNotePencil";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import Link from "next/link";
import DatePicker from "./date-picker";

export default function Menubar() {
    return (
        <div className="flex items-center justify-center bg-zinc-100/40 dark:bg-zinc-900 border-t border-t-neutral-300 dark:border-t-neutral-800 p-2">
            <Button asChild variant="ghost">
                <Link href="/">
                    <PiNotePencil className="w-6 h-6" />
                </Link>
            </Button>
            <Button asChild variant="ghost">
                <Link href="/journal">
                    <IoJournalOutline className="w-6 h-6" />
                </Link>
            </Button>
            <DatePicker />
            <Button asChild variant="ghost">
                <Link href="/settings">
                    <MdOutlineSettings className="w-6 h-6" />
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
    );
}
