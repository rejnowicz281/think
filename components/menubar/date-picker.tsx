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

    const formatDate = (date?: Date) => {
        if (!date) return "Today";

        const formattedDate = format(date, "yyyy-MM-dd");
        const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
        const yesterday = format(addDays(new Date(), -1), "yyyy-MM-dd");

        if (formattedDate === yesterday) return "Yesterday";
        if (formattedDate === tomorrow) return "Tomorrow";

        return formattedDate;
    };

    return (
        <Popover
            onOpenChange={() => {
                const linkDate = pathname.split("/").pop();

                if (linkDate === "today") setDate(undefined);
                else if (linkDate === "yesterday") setDate(addDays(new Date(), -1));
                else if (linkDate === "tomorrow") setDate(addDays(new Date(), 1));
                else if (linkDate) setDate(new Date(linkDate));
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
                        setDate(
                            !date || format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? undefined : date
                        );
                    }}
                    defaultMonth={date}
                />

                <PopoverClose asChild>
                    <Button variant="outline" asChild>
                        {(() => {
                            const formattedDate = formatDate(date);

                            return <Link href={`/journal/${formattedDate.toLowerCase()}`}>{formattedDate}</Link>;
                        })()}
                    </Button>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    );
}
