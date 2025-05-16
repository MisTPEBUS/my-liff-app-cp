"use client";

import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const NavDatePick = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* ← 左箭頭 */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setDate((prev) => subDays(prev, 1))}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* 日期顯示 + Calendar */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[140px] justify-between">
            {format(date, "yyyy-MM-dd")}
            <CalendarIcon className="ml-2 w-4 h-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => selected && setDate(selected)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* → 右箭頭 */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setDate((prev) => addDays(prev, 1))}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NavDatePick;
