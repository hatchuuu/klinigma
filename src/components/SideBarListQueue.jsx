// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { ChevronRight } from "lucide-react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "./ui/accordion";
// import { formatDate } from "@/data/service";
// import { ScrollArea } from "./ui/scroll-area";
// import { updateBooking } from "@/data/bookings";
// import { failedToast, successToast } from "@/lib/toaster";
// import { jwtDecode } from "jwt-decode";

// const SideBarListQueue = ({ data }) => {

//   const handleCancel = async (id) => {
//     try {
//       const response = await updateBooking(id, "Canceled", true)
//       if (response.status == 200) successToast("Berhasil Membatalkan antrean")
//       else { throw new Error("Gagal Mematalkan Antrean") }
//     } catch (error) {
//       failedToast(error.message)
//     }
//   }
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="ghost" className="hover:bg-accent">
//           Lihat semua antrean  <ChevronRight />
//         </Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle className="flex justify-center flex-col items-center gap-2">
//             <img src="/klinigma.png" alt="Klinigma Logo" className="w-28" />
//             <p className="text-xs">Kesehatanmu ada di genggaman mu</p>
//           </SheetTitle>
//         </SheetHeader>
//         <ScrollArea className="py-10 h-[80vh]">
//           <Accordion type="single" collapsible className="w-full pr-5">
//             {data?.map((value, i) => (
//               <AccordionItem key={value.id} value={`item-${i + 1}`}>
//                 <AccordionTrigger>
//                   <div className="flex flex-col w-full gap-2">
//                     <div className="flex flex-col">
//                       <div className="text-lg font-semibold">
//                         {value.bookingDate
//                           ? formatDate(value.bookingDate).fullDate
//                           : "Tanggal belum ditentukan"}
//                       </div>
//                       <div>{value.polyName}</div>
//                     </div>
//                     {value.status === "Waiting" ? (
//                       <div className="bg-green-400 h-max w-2 text-sm ">
//                         Datang Segera
//                       </div>
//                     ) : (
//                       <div className="bg-blue-400 h-max w-fit rounded-sm p-1 text-sm">
//                         Menunggu Antrean : {value.queueNumber}
//                       </div>
//                     )}
//                   </div>

//                 </AccordionTrigger>
//                 <AccordionContent className="flex flex-col justify-end items-end gap-1">
//                   <Button onClick={() => handleCancel(value.id)} variant="secondary" className="py-3 px-6">
//                     Batalkan
//                   </Button>
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </ScrollArea>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default SideBarListQueue;

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
} from "@/components/ui/accordion";
import { formatDate } from "@/data/service";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateBooking } from "@/data/bookings";
import { failedToast, successToast } from "@/lib/toaster";
import { cn } from "@/lib/utils";

const SideBarListQueue = ({ data }) => {
  const handleCancel = async (id) => {
    try {
      const response = await updateBooking(id, "Canceled", true);
      if (response.status === 200) successToast("Berhasil Membatalkan antrean");
      else throw new Error("Gagal Membatalkan Antrean");
    } catch (error) {
      failedToast(error.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="flex items-end w-full gap-2 px-4 py-2"
        >
          <span className="font-medium text-black">Lihat Semua Antrean</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-100">
        <SheetHeader>
          <SheetTitle className="flex flex-col items-center gap-3">
            <img src="/klinigma.png" alt="Klinigma Logo" className="w-24" />
            <p className="text-xs text-muted-foreground font-medium">
              Kesehatanmu ada di genggamanmu
            </p>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="py-6 h-[75vh] px-4">
          <Accordion
            type="single"
            collapsible
            className="w-full bg-white rounded-lg shadow-md p-4"
          >
            {data?.map((value, i) => (
              <AccordionItem
                key={value.id}
                value={`item-${i + 1}`}
                className="mb-4 rounded-lg border border-gray-300"
              >
                <AccordionTrigger className="flex flex-col items-start w-full gap-2 p-4 bg-gray-50 hover:bg-gray-100">
                  <div className="text-lg font-semibold text-primary">
                    {value.bookingDate
                      ? formatDate(value.bookingDate).fullDate
                      : "Tanggal belum ditentukan"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {value.polyName}
                  </div>
                  <div
                    className={cn(
                      "text-sm px-2 py-1 rounded-lg",
                      value.status === "Waiting"
                        ? "bg-green-200 text-green-700"
                        : "bg-blue-200 text-blue-700"
                    )}
                  >
                    {value.status === "Waiting"
                      ? "Datang Segera"
                      : `Menunggu Antrean: ${value.queueNumber}`}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex justify-end p-4 gap-2">
                  <Button
                    onClick={() => handleCancel(value.id)}
                    variant="secondary"
                    className="px-5 py-2 text-sm font-medium"
                  >
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
