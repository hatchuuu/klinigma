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
import { updateBooking } from "@/data/bookings";
import { failedToast, successToast } from "@/lib/toaster";
import { jwtDecode } from "jwt-decode";

const SideBarListQueue = ({ data }) => {

  const handleCancel = async (id) => {
    try {
      const response = await updateBooking(id, "Canceled", true)
      if (response.status == 200) successToast("Berhasil Membatalkan antrean")
      else { throw new Error("Gagal Mematalkan Antrean") }
    } catch (error) {
      failedToast(error.message)
    }
  }
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
            {data?.map((value, i) => (
              <AccordionItem key={value.id} value={`item-${i + 1}`}>
                <AccordionTrigger>
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold">
                        {value.bookingDate
                          ? formatDate(value.bookingDate).fullDate
                          : "Tanggal belum ditentukan"}
                      </div>
                      <div>{value.polyName}</div>
                    </div>
                    {value.status === "Waiting" ? (
                      <div className="bg-green-400 h-max w-2 text-sm ">
                        Datang Segera
                      </div>
                    ) : (
                      <div className="bg-blue-400 h-max w-fit rounded-sm p-1 text-sm">
                        Menunggu Antrean : {value.queueNumber}
                      </div>
                    )}
                  </div>

                </AccordionTrigger>
                <AccordionContent className="flex flex-col justify-end items-end gap-1">
                  <Button onClick={() => handleCancel(value.id)} variant="secondary" className="py-3 px-6">
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