import ThemeButton from "@/components/settings/theme-button";

export default function AppearancePage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-4 mb-4">
                <h2 className="text-xl font-semibold">Appearance</h2>
                <p className="text-gray-500">Customize the appearance of the app</p>
            </div>

            <div className="flex flex-col items-start gap-4">
                <div>
                    <h3 className="font-semibold">Theme</h3>
                    <p className="text-gray-500 text-sm">Choose between light and dark mode.</p>
                </div>

                <ThemeButton />
            </div>
        </div>
    );
}
