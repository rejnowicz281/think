import DeleteAccountButton from "@/components/settings/delete-account-button";

export default function AccountPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-4 mb-4">
                <h2 className="text-xl font-semibold">Account</h2>
                <p className="text-gray-500">Manage your account settings</p>
            </div>

            <DeleteAccountButton />
        </div>
    );
}
