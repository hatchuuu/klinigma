import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { formatDate } from "@/data/service";
import { ScrollArea } from "./ui/scroll-area";

const SideBarListQueue = ({ data }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="hover:bg-accent">
          <ChevronRight />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex justify-center flex-col items-center gap-2">
            <img src="/klinigma.png" alt="Klinigma Logo" className="w-28" />
            <p className="text-xs">Kesehatanmu ada di genggaman mu</p>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="py-10 h-[80vh]">
          <Accordion type="single" collapsible className="w-full pr-5">
            {data.map((value, i) => (
              <AccordionItem key={value.id} value={`item-${i + 1}`}>
                <AccordionTrigger>
                  <div className="flex justify-between px-5">
                    <div className="flex flex-col gap-1">
                      <p>
                        {/* Check if value.visitedAt exists before formatting */}
                        {value.visitedAt
                          ? formatDate(value.visitedAt).fullDate
                          : "Tanggal belum ditentukan"}
                      </p>
                      <p>{value.polyName}</p>
                    </div>
                    {value.status === "Created" ? (
                      <p className="bg-green-400 py-1 px-3 rounded-sm text-sm ">
                        Dibuat
                      </p>
                    ) : (
                      <p className="bg-blue-400 py-1 px-3 rounded-sm text-sm">
                        Menunggu
                      </p>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col justify-end items-end gap-1">
                  <Button variant="secondary" className="py-4 px-2">
                    Batalkan
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarListQueue;