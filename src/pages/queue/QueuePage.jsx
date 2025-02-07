import { TableComponent } from '@/components/table/TableComponent'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllQueuesByUser } from '@/data/queue';
import { failedToast } from '@/lib/toaster';
import { jwtDecode } from 'jwt-decode';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const QueuePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [queues, setQueues] = useState([])
    const [fetch, setFetch] = useState(false)
    const [hasNext, setHasNext] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get("page")) || 1

    useEffect(() => {
        const fetchQueuesByUser = async () => {
            const token = sessionStorage.getItem("token")
            if (!token) return
            try {
                const { id } = jwtDecode(token)
                const response = await getAllQueuesByUser({
                    userId: id,
                    page: page,
                    limit: 10,
                })
                setQueues(response)
                setHasNext(response.length === 10)
            } catch (error) {
                failedToast(error.message)
            }
        }
        fetchQueuesByUser()
    }, [page, fetch])

    const filterQueue = queues.filter((queue) => {
        const search = searchTerm.toLowerCase();
        return (
            queue.doctor.name.toLowerCase().includes(search) ||
            queue.polyclinic.polyclinicName.toLowerCase().includes(search) ||
            queue.queueNumber.toString().includes(search) ||
            queue.status.toLowerCase().includes(search)
        )
    });

    const changePage = (newPage) => {
        setSearchParams({ page: newPage.toString() })
    }

    return (
        <div className="w-full pt-36">
            <div className="max-w-5xl mx-auto flex flex-col gap-[3.5rem]">
                <section className="flex w-full justify-between items-end">
                    <h3 className="text-4xl font-bold text-black mb-1">
                        #Daftar Antrean
                    </h3>
                    <img src="/klinigma.png" alt="Klinigma" width={120} />
                </section>
                <section className="flex justify-center items-center gap-2 w-full">
                    <div className="relative w-full">
                        <Input
                            placeholder="Cari Nama User, nomor, dan email"
                            className="ps-7 pe-16 peer"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="transition-all absolute z-10 right-4 bottom-[10px] peer-hover:bottom-[7.1px] peer-hover:right-[9.5px] peer-focus-visible:bottom-[7.5px] peer-focus-visible:right-[10px]" />
                    </div>
                </section>
                <section>
                    <TableComponent data={filterQueue} refreshPage={setFetch} />
                </section>

                <section className="flex justify-end gap-2">
                    <Button disabled={page === 1} onClick={() => changePage(page - 1)}>Sebelum</Button>
                    <Button disabled={!hasNext} onClick={() => changePage(page + 1)}>Berikutnya</Button>
                </section>
            </div>
        </div>
    )
}

export default QueuePage