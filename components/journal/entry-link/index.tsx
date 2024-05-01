"use client";
import insertAndDeleteBullets from "@/actions/journal/modify/insert-and-delete-bullets";
import { Bullet } from "@/types/bullet";
import clsx from "clsx";
import { addDays, format } from "date-fns";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { useDrag, useDrop } from "react-dnd";
import BulletsContainer from "./bullets-container";

export default function EntryLink({ bullets, date }: { bullets: Bullet[]; date: string }) {
    const [isPending, startTransition] = useTransition();
    const [optimisticBullets, setOptimisticBullets] = useOptimistic(bullets);
    const [optimisticVisible, setOptimisticVisible] = useOptimistic(!!bullets.find((bullet) => bullet.date === date));

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "ENTRY-LINK",
            item: { date, bullets: optimisticBullets },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            end: (_, monitor) => {
                const dropResult: { error?: true } | null = monitor.getDropResult();

                if (dropResult && !dropResult.error) startTransition(() => setOptimisticVisible(false));
            },
        }),
        [optimisticBullets]
    );

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "ENTRY-LINK",
            drop: handleDrop,
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        [optimisticBullets]
    );

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

    // handle merging item (entry) with this entry
    function handleDrop(item: { date: string; bullets: Bullet[] }) {
        const dateToDelete = item.date;
        const bulletsToDelete = item.bullets;

        if (dateToDelete == date) return { error: true };

        const confirm = window.confirm(`Merge ${dateToDelete} into ${date} ?`);

        if (!confirm) return { error: true };

        const lastPos = optimisticBullets[optimisticBullets.length - 1].pos;

        const formattedBulletsToMerge = bulletsToDelete.map((bullet) => {
            const text = bullet.text;

            const bulletPos = bullet.pos;

            const pos = lastPos + bulletPos + 1;

            return {
                id: Math.random().toString(36).substring(7),
                created_at: new Date().toISOString(),
                user_id: "mock-user-id",
                text,
                date,
                pos,
            };
        });

        startTransition(() => {
            setOptimisticBullets((prev) => {
                const newBullets = [...prev, ...formattedBulletsToMerge];
                return newBullets;
            });

            const simpleBullets = formattedBulletsToMerge.map((bullet) => ({
                date: bullet.date,
                text: bullet.text,
                pos: bullet.pos,
            }));

            insertAndDeleteBullets(simpleBullets, dateToDelete);
        });
    }

    if (!optimisticVisible) return null;

    return (
        <Link
            className={clsx(
                "entry-link hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md",
                isOver && "bg-zinc-100 dark:bg-zinc-800",
                isDragging && "opacity-50"
            )}
            ref={drag as any}
            href={href}
        >
            <div ref={drop as any} className="p-4 flex flex-col gap-2">
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
