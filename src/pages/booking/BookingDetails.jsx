import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

function RingkasanBooking({ poliklinik, tanggalTerpilih, dokterTerpilih }) {
  return (
    <Drawer>
      <DrawerContent>
        <DrawerClose />
        <DrawerHeader>
          <DrawerTitle>Ringkasan Booking</DrawerTitle>
          <DrawerDescription>
            Berikut adalah ringkasan booking Anda:
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>
            <strong>Poliklinik:</strong> {poliklinik.polyName}
          </p>
          {dokterTerpilih ? (
            <p>
              <strong>Dokter:</strong> {dokterTerpilih.name}
            </p>
          ) : (
            <p>Loading data dokter...</p>
          )}
          <p>
            <strong>Tanggal:</strong>{" "}
            {tanggalTerpilih.format("dddd, DD MMMM YYYY")}
          </p>
        </div>
        <DrawerFooter>
          <Button>Konfirmasi Booking</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default RingkasanBooking;