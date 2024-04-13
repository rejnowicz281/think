"use client";

type HardRefreshButtonProps = {
    className?: string;
    content?: string;
};

export default function HardRefreshButton({
    className = "text-blue-500 hover:underline",
    content = "Refresh",
}: HardRefreshButtonProps) {
    return (
        <button className={className} onClick={() => window.location.reload()}>
            {content}
        </button>
    );
}
