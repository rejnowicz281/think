"use client";
import insertAndDeleteBullets from "@/actions/journal/modify/insert-and-delete-bullets";
import { Bullet } from "@/types/bullet";
import clsx from "clsx";
import { addDays, format } from "date-fns";
import Link from "next/link";
import { DragEvent, useOptimistic, useState, useTransition } from "react";
import BulletsContainer from "./bullets-container";

export default function EntryLink({ bullets, date }: { bullets: Bullet[]; date: string }) {
    const [draggedOver, setDraggedOver] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [optimisticBullets, setOptimisticBullets] = useOptimistic(bullets);

    const todayYear = new Date().toISOString().split("-")[0];
    const entryDateYear = date.split("-")[0];

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        year: todayYear === entryDateYear ? undefined : "numeric",
        month: "short",
        day: "numeric",
    });

    const fullDate = new Date(date).toISOString().split("T")[0];

    const today = new Date().toISOString().split("T")[0];
    const yesterday = format(addDays(new Date(), -1), "yyyy-MM-dd");
    const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
    const isToday = fullDate === today;
    const isYesterday = fullDate === yesterday;
    const isTomorrow = fullDate === tomorrow;

    const href = `/journal/${date}`;

    function handleDragStart(e: DragEvent<HTMLAnchorElement>) {
        const target = e.target as HTMLAnchorElement;
        const targetDate = target.dataset.date;

        if (target && targetDate) e.dataTransfer.setData("text/plain", targetDate);
    }

    async function handleDrop(e: DragEvent<HTMLAnchorElement>) {
        setDraggedOver(false);

        e.preventDefault();

        const dateToDelete = e.dataTransfer.getData("text");
        const dateToMerge = date;

        if (!dateToDelete || dateToDelete == dateToMerge) return;

        const confirm = window.confirm(`Merge ${dateToDelete} into ${dateToMerge} ?`);

        if (confirm) {
            const bulletContainersToMerge = document.querySelectorAll(
                `[data-date="${dateToDelete}"] .bullet-container`
            ) as NodeListOf<HTMLDivElement>;

            const lastPos = bullets[bullets.length - 1].pos;

            const bulletsToMerge = Array.from(bulletContainersToMerge).map((bullet) => {
                const text = bullet.textContent!;

                const bulletPos = parseInt(bullet.dataset.pos!);

                const pos = lastPos + bulletPos + 1;

                return {
                    id: Math.random().toString(36).substring(7),
                    created_at: new Date().toISOString(),
                    user_id: "mock-user-id",
                    text,
                    date: dateToMerge,
                    pos,
                };
            });

            const transition = async () => {
                setOptimisticBullets((prev) => {
                    const newBullets = [...prev, ...bulletsToMerge];
                    return newBullets;
                });

                const entryToDelete = document.querySelector(
                    `[data-date="${dateToDelete}"].entry-link`
                ) as HTMLAnchorElement;

                if (entryToDelete) entryToDelete.classList.add("hidden");

                const simpleBullets = bulletsToMerge.map((bullet) => ({
                    date: bullet.date,
                    text: bullet.text,
                    pos: bullet.pos,
                }));

                const res = await insertAndDeleteBullets(simpleBullets, dateToDelete);

                if (!res.success && entryToDelete) entryToDelete.classList.remove("hidden");
            };

            startTransition(transition);
        }
    }

    return (
        <Link
            data-date={date}
            draggable={true}
            className={clsx(
                "entry-link hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md",
                draggedOver && "bg-zinc-100 dark:bg-zinc-800"
            )}
            onDrop={handleDrop}
            onDragLeave={() => setDraggedOver(false)}
            onDragOver={(e) => {
                setDraggedOver(true);
                e.preventDefault();
            }}
            onDragStart={handleDragStart}
            href={href}
        >
            <div className="p-4 flex flex-col gap-2" key={date}>
                <h2 className="text-2xl font-bold gap-2">
                    {formattedDate}
                    {isToday ? (
                        <span className="text-sm text-gray-500"> ~ today</span>
                    ) : isYesterday ? (
                        <span className="text-sm text-gray-500"> ~ yesterday</span>
                    ) : isTomorrow ? (
                        <span className="text-sm text-gray-500"> ~ tomorrow</span>
                    ) : (
                        ""
                    )}
                </h2>
                <BulletsContainer bulletList={optimisticBullets} />
            </div>
        </Link>
    );
}
