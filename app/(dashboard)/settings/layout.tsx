import PathnameContainer from "@/components/general/pathname-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 flex justify-center">
            <div className="py-12 px-7 max-w-[900px] w-full">
                <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-4 mb-8">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                    <p className="text-gray-500">Manage your account and preferences</p>
                </div>
                <div className="flex flex-col gap-8 lg:flex-row">
                    <div className="flex lg:flex-col lg:gap-3">
                        <PathnameContainer
                            href="/settings"
                            activeContent={
                                <Button asChild className="w-[160px]" variant="secondary">
                                    <Link href="/settings">Appearance</Link>
                                </Button>
                            }
                            content={
                                <Button asChild className="w-[160px]" variant="link">
                                    <Link href="/settings">Appearance</Link>
                                </Button>
                            }
                        />
                        <PathnameContainer
                            href="/settings/account"
                            activeContent={
                                <Button asChild className="w-[160px]" variant="secondary">
                                    <Link href="/settings/account">Account</Link>
                                </Button>
                            }
                            content={
                                <Button asChild className="w-[160px]" variant="link">
                                    <Link href="/settings/account">Account</Link>
                                </Button>
                            }
                        />
                    </div>
                    <div className="flex flex-1 flex-col">{children}</div>
                </div>
            </div>
        </div>
    );
}
