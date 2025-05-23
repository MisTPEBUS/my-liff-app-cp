"use client";

import { useEffect, useState } from "react";
import { format, addDays, subDays, isAfter, startOfToday } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useDateStore } from "@/store/DateStore";

interface NavDatePickProps {
  initialDate?: Date;
  disableFuture?: boolean;
  onDateChange?: (date: Date) => void;
}

const NavDatePick = ({
  initialDate = new Date(),
  disableFuture = false,
  onDateChange,
}: NavDatePickProps) => {
  const [date, setDate] = useState<Date>(initialDate);
  const { setSelectedDate } = useDateStore();

  const handleChangeDate = (newDate: Date) => {
    if (disableFuture && isAfter(newDate, startOfToday())) return;
    setDate(newDate);
    setSelectedDate(format(newDate, "yyyy-MM-dd"));
    onDateChange?.(newDate);
  };
  // ✅ 初始化時同步狀態
  useEffect(() => {
    setSelectedDate(format(initialDate, "yyyy-MM-dd"));
  }, []);
  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      {/* 今天 */}
      <Button
        size="sm"
        variant="default"
        className="text-base font-bold   hover:bg-white-pure hover:text-black-main hover:border-primary hover:border"
        onClick={() => handleChangeDate(startOfToday())}
      >
        今天
      </Button>
      {/* ← 左箭頭 */}

      <div className="flex">
        <Button
          size="icon"
          className="bg-black-main text-white-pure"
          variant="ghost"
          onClick={() => handleChangeDate(subDays(date, 1))}
          aria-label="前一天"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {/* 日期顯示 + Calendar */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[100px] justify-between text-sm text-black-main bg-white-pure hover:bg-black-main hover:text-white-pure"
            >
              {format(date, "yyyy-MM-dd")}
              <CalendarIcon className="ml-2 w-4 h-4  text-black-main bg-white-pure hover:bg-black-main hover:text-white-pure" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selected) => selected && handleChangeDate(selected)}
              initialFocus
              disabled={(date) =>
                disableFuture && isAfter(date, startOfToday())
              }
            />
          </PopoverContent>
        </Popover>
        {/* → 右箭頭 */}
        <Button
          size="icon"
          variant="ghost"
          className="bg-black-main text-white-pure"
          onClick={() => handleChangeDate(addDays(date, 1))}
          aria-label="後一天"
          disabled={disableFuture && isAfter(addDays(date, 1), startOfToday())}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default NavDatePick;
