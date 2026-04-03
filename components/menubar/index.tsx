import signOut from "@/actions/auth/modify/sign-out";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { IoJournalOutline } from "@react-icons/all-files/io5/IoJournalOutline";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";
import { IoSearch } from "@react-icons/all-files/io5/IoSearch";
import { MdOutlineSettings } from "@react-icons/all-files/md/MdOutlineSettings";
import { PiNotePencil } from "@react-icons/all-files/pi/PiNotePencil";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import DatePicker from "./date-picker";
import NavButton from "./nav-button";

export default function Menubar() {
    return (
        <div className="flex-1 flex md:flex-col gap-4 items-center justify-center bg-zinc-100/40 dark:bg-zinc-900 md:bg-inherit md:dark:bg-inherit border-t border-t-neutral-300 md:border-t-0 dark:border-t-neutral-800 p-2">
            <NavButton icon={<PiNotePencil className="w-6 h-6" />} href="/" />
            <NavButton icon={<IoJournalOutline className="w-6 h-6" />} href="/journal" />
            <NavButton icon={<IoSearch className="w-6 h-6" />} href="/search" />
            <DatePicker />
            <NavButton icon={<MdOutlineSettings className="w-6 h-6" />} href="/settings" />

            <form action={signOut}>
                <Button asChild size="icon" className="rounded-full" variant="ghost">
                    <SubmitButton
                        content={<IoLogOutOutline className="w-6 h-6" />}
                        loading={<VscLoading className="w-6 h-6 animate-spin" />}
                    />
                </Button>
            </form>
        </div>
    );
}
