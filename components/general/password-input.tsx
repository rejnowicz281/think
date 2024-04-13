import { Input } from "@/components/ui/input";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";
import clsx from "clsx";
import { FC, useState } from "react";

const PasswordInput: FC<{ placeholder?: string; className?: string }> = ({ placeholder = "••••••••", className }) => {
    const [type, setType] = useState<"text" | "password">("password");

    return (
        <div className={clsx("relative", className)}>
            <Input type={type} id="password" name="password" className="pr-8" placeholder={placeholder} />
            <button
                type="button"
                className="rounded-md absolute top-0 bottom-0 right-0 shrink px-2 text-gray-500 hover:text-gray-400 transition-colors ring-offset-white focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-within:ring-zinc-300"
                onClick={() => setType((prev) => (prev === "password" ? "text" : "password"))}
            >
                {type === "password" ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;
