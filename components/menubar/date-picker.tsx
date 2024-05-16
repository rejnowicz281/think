"use client";

import getWrittenEntryDates from "@/actions/journal/read/get-written-entry-dates/server";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QueryClientProvider from "@/providers/query-provider";
import { PopoverClose } from "@radix-ui/react-popover";
import { IoCalendarClearOutline as CalendarIcon } from "@react-icons/all-files/io5/IoCalendarClearOutline";
import { useInfiniteQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DatePicker() {
    return (
        <QueryClientProvider>
            <Content />
        </QueryClientProvider>
    );
}

export function Content() {
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [date, setDate] = useState<Date>();
    const pathname = usePathname();

    const queryKey = ["dates"];

    const { data, fetchNextPage } = useInfiniteQuery({
        queryKey,
        queryFn: async () => {
            {
                return getWrittenEntryDates(currentMonth, currentYear).then((res) => res.dates);
            }
        },
        initialPageParam: 0,
        getNextPageParam() {
            return 0;
        },
    });

    const dates = data?.pages.flat();

    useEffect(() => {
        fetchNextPage();
    }, [currentMonth]);

    const today = format(new Date(), "yyyy-MM-dd");

    return (
        <Popover
            onOpenChange={(open) => {
                if (open) {
                    fetchNextPage();
                    const lastPathname = pathname?.split("/").pop();

                    const linkDate = lastPathname?.match(/^\d{4}-\d{2}-\d{2}$/)?.[0];

                    if (!linkDate || linkDate === today) setDate(undefined);
                    else if (linkDate) setDate(new Date(linkDate));
                }
            }}
        >
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <CalendarIcon className="w-6 h-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="-1">Yesterday</SelectItem>

                        <SelectItem value="0">Today</SelectItem>

                        <SelectItem value="1">Tomorrow</SelectItem>
                    </SelectContent>
                </Select>

                <Calendar
                    showOutsideDays={false}
                    modifiers={{ entryDates: dates?.map((date) => new Date(date)) || [] }}
                    modifiersClassNames={{ entryDates: "dark:bg-zinc-900 bg-zinc-100 underline" }}
                    mode="single"
                    selected={date}
                    onMonthChange={(date) => {
                        setCurrentMonth(date.getMonth() + 1);
                        setCurrentYear(date.getFullYear());
                    }}
                    onSelect={(date) => {
                        setDate(!date ? undefined : date);
                    }}
                    defaultMonth={date}
                />

                <PopoverClose asChild>
                    <Button variant="outline" asChild>
                        {(() => {
                            const formattedDate = date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd");

                            const isToday = formattedDate === today;
                            const isTomorrow = formattedDate === format(addDays(new Date(), 1), "yyyy-MM-dd");
                            const isYesterday = formattedDate === format(addDays(new Date(), -1), "yyyy-MM-dd");

                            return (
                                <Link href={`/journal/${formattedDate.toLowerCase()}`}>
                                    {isToday
                                        ? "Today"
                                        : isTomorrow
                                        ? "Tomorrow"
                                        : isYesterday
                                        ? "Yesterday"
                                        : formattedDate}
                                </Link>
                            );
                        })()}
                    </Button>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    );
}
