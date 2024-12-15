import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import NavbarButton from "./NavbarButton";
import { MenuSquareIcon, Stethoscope, User2 } from "lucide-react";
import { useState } from "react";

const DrawerMenu = () => {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="navbar">
                    <MenuSquareIcon size={20} />
                    <p className=" text-xs">MENU</p>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Lakukan Perubahan pada</DrawerTitle>
                    <DrawerDescription>Pilih salah satu</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="mb-6">
                    <div className="flex flex-row justify-center items-center gap-6 mb-6">
                        <div onClick={() => setOpen(false)} >
                            <NavbarButton path="/doctors" text="DOKTER" className="bg-purple-950 rounded-xl h-32 aspect-square">
                                <Stethoscope size={30} />
                            </NavbarButton>
                        </div>
                        <div onClick={() => setOpen(false)}>

                            <NavbarButton className="bg-purple-950 rounded-xl h-32 aspect-square" path="/users" text="USER">
                                <User2 size={30} />
                            </NavbarButton>
                        </div>
                    </div>

                    <DrawerClose asChild>
                        <Button variant="outline" className="bg-white">Tutup</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerMenu;
