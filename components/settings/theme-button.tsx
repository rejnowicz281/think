"use client";

import { BsMoonStars } from "@react-icons/all-files/bs/BsMoonStars";
import { BsSun } from "@react-icons/all-files/bs/BsSun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const ThemeButton = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
                if (theme === "light") setTheme("dark");
                else setTheme("light");
            }}
        >
            {theme === "light" ? (
                <>
                    <BsSun />
                    Light Mode
                </>
            ) : (
                <>
                    <BsMoonStars />
                    Dark Mode
                </>
            )}
        </Button>
    );
};

export default ThemeButton;
