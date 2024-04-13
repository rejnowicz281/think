"use client";

import signIn from "@/actions/auth/modify/sign-in";
import signUp from "@/actions/auth/modify/sign-up";
import PasswordInput from "@/components/general/password-input";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaThinkPeaks } from "@react-icons/all-files/fa6/FaThinkPeaks";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { useSearchParams } from "next/navigation";
import DemoLoginButton from "./demo-login-button";
import GithubLoginButton from "./github-login-button";
import GoogleLoginButton from "./google-login-button";

export default function AuthContainer({ action = "login" }: { action: "login" | "register" }) {
    const generalError = useSearchParams().get("error");
    const emailError = useSearchParams().get("email-error");
    const passwordError = useSearchParams().get("password-error");

    return (
        <div className="flex-1 mx-auto max-w-[400px] w-full flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-3 items-center text-center">
                <div className="flex items-center gap-3">
                    <div className="sm:hidden">
                        <FaThinkPeaks size={30} />
                    </div>
                    <h2 className="text-3xl font-semibold">{action === "login" ? "Login" : "Register"}</h2>
                </div>
                <p className={generalError ? "text-red-500 font-semibold" : "text-gray-500"}>
                    {generalError
                        ? generalError
                        : `Enter your credentials below to ${action === "login" ? "log in" : "register your account"}.`}
                </p>
            </div>
            <form className="flex flex-col gap-6" action={action === "login" ? signIn : signUp}>
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-4 items-center">
                        <Label className="text-right pr-3" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            className="col-span-3"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                        />
                        {emailError && (
                            <div className="col-start-2 pl-3 py-1 col-span-3 text-red-500 font-semibold dark:font-normal text-sm">
                                {emailError}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <Label className="text-right pr-3" htmlFor="password">
                            Password
                        </Label>
                        <PasswordInput className="col-span-3" placeholder="Must have at least 6 characters" />
                        {passwordError && (
                            <div className="col-start-2 pl-3 py-1 col-span-3 text-red-500 font-semibold dark:font-normal text-sm">
                                {passwordError}
                            </div>
                        )}
                    </div>
                </div>
                <Button
                    asChild
                    className="dark:bg-zinc-800 dark:text-white dark:border dark:border-neutral-700 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1"
                >
                    <SubmitButton
                        content={action === "login" ? "Login with Email" : "Register your account"}
                        loading={<VscLoading className="animate-spin" />}
                    />
                </Button>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-t-neutral-300 dark:border-t-neutral-600"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="dark:bg-[#121212] bg-white px-2 font-semibold tracking-widest text-gray-500">
                        OR CONTINUE WITH
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <DemoLoginButton />
                <GithubLoginButton />
                <GoogleLoginButton />
            </div>
        </div>
    );
}
