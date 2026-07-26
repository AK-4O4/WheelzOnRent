"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

export function Calendar04() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2025, 10, 11),
        to: new Date(2025, 10, 14),
    });

    return (
        <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={{ dayOfWeek: [0, 6] }}
            excludeDisabled
        />
    );
}
