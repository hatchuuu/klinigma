import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FaBell } from "react-icons/fa"
import { Badge } from "@/components/ui/badge";
import { useNotif } from '@/store/store';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

const DropdownNotif = () => {
    const notif = useNotif((state) => state.notif)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full w-max p-2 me-16 relative  hover:bg-green-500/30 transition-all">
                    <FaBell size={27} color="white" />
                    {notif.length == 0 ? null : <Badge>{notif.length}</Badge>}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                <ScrollArea className='w-96 h-[50vh] p-1'>
                    <p className='text-2xl text-black font-semibold py-4 px-5'>Pemberitahuan</p>
                    {
                        notif.map((data, i) => (
                            <div key={i}>
                                <DropdownMenuItem className="focus:bg-green-200/20 p-4">
                                    <div className='w-full flex flex-col p-1 gap-2'>
                                        <div className='w-full flex justify-between '>
                                            <p className='text-left bg-red-200 p-2 rounded-md'>{data.title}</p>
                                            <button
                                                onClick={() => alert("Notif Nomor " + data.id + " akan dihapus")}
                                                className='aspect-square rounded-md hover:bg-green-500/20 bg-green-500'>{data.id}</button>
                                        </div>
                                        <p className='text-left bg-green-500/20 p-2 rounded-md line-clamp-3'>{data.message}</p>
                                    </div>
                                </DropdownMenuItem>
                                <Separator className="w-full h-[1px]" />
                            </div>
                        ))
                    }
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownNotif