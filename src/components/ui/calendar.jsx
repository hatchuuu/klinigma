import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const [year, setYear] = React.useState(new Date().getFullYear()); // State untuk tahun aktif

  return (
    <div className={cn("p-3", className)}>
      {/* Bagian Tombol untuk Mengubah Tahun */}
      <div className="flex justify-between items-center mb-3">
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 p-0"
          )}
          onClick={() => setYear((prev) => prev - 1)}
        >
          -1 Tahun
        </button>
        <p className="text-lg font-medium">{year}</p>
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 p-0"
          )}
          onClick={() => setYear((prev) => prev + 1)}
        >
          +1 Tahun
        </button>
      </div>

      {/* Komponen Kalender */}
      <DayPicker
        showOutsideDays={showOutsideDays}
        className="p-3"
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        mode="single"
        selected={props.selected}
        {...props}
        // Menambahkan properti `fromMonth` dan `toMonth` untuk membatasi tampilan tahun
        fromMonth={new Date(year, 0, 1)}
        toMonth={new Date(year, 11, 31)}
        captionLayout="dropdown" // Jika ingin menampilkan dropdown bulan
      />
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
