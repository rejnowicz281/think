import deleteAccount from "@/actions/auth/modify/delete-account";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { IoWarningOutline } from "@react-icons/all-files/io5/IoWarningOutline";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";

export default function DeleteAccountButton() {
    return (
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
    );
}
