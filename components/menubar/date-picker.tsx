"use client";

import { IoCalendarClearOutline as CalendarIcon } from "@react-icons/all-files/io5/IoCalendarClearOutline";
import { addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PopoverClose } from "@radix-ui/react-popover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DatePicker() {
    const [date, setDate] = useState<Date>();
    const pathname = usePathname();

    const today = format(new Date(), "yyyy-MM-dd");

    return (
        <Popover
            onOpenChange={(open) => {
                if (open) {
                    const lastPathname = pathname.split("/").pop();

                    const linkDate = lastPathname?.match(/^\d{4}-\d{2}-\d{2}$/)?.[0];
                    console.log(linkDate);

                    if (!linkDate || linkDate === "journal" || linkDate === today) setDate(undefined);
                    else if (linkDate) setDate(new Date(linkDate));
                }
            }}
        >
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <CalendarIcon className="w-6 h-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                    onValueChange={(value) => setDate(value === "0" ? undefined : addDays(new Date(), parseInt(value)))}
                >
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
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                        setDate(!date || format(date, "yyyy-MM-dd") === today ? undefined : date);
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
