import deleteAccount from "@/actions/auth/modify/delete-account";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { IoWarningOutline } from "@react-icons/all-files/io5/IoWarningOutline";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";

export default function AccountPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-4 mb-4">
                <h2 className="text-xl font-semibold">Account</h2>
                <p className="text-gray-500">Manage your account settings</p>
            </div>

            <form action={deleteAccount}>
                <Button asChild variant="destructive">
                    <SubmitButton
                        className="flex items-center gap-2"
                        content={
                            <>
                                <IoWarningOutline />
                                Delete Account
                            </>
                        }
                        loading={
                            <>
                                <VscLoading className="animate-spin" />
                                Delete Account
                            </>
                        }
                    />
                </Button>
            </form>
        </div>
    );
}
