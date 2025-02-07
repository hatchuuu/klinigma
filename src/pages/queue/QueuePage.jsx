import { TableComponent } from '@/components/table/TableComponent'
import { Button } from '@/components/ui/button';
import { getAllQueuesByUser } from '@/data/queue';
import { failedToast } from '@/lib/toaster';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const QueuePage = () => {

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

    const changePage = (newPage) => {
        setSearchParams({ page: newPage.toString() })
    }

    return (
        <div className="w-full pt-36">
            <div className="max-w-5xl mx-auto flex flex-col gap-[2rem]">
                <section className="flex w-full justify-between items-end">
                    <h3 className="text-4xl font-bold text-black mb-1">
                        #Daftar Antrean
                    </h3>
                    <img src="/klinigma.png" alt="Klinigma" width={120} />
                </section>

                <section>
                    <TableComponent data={queues} refreshPage={setFetch} />
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