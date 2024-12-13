import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// import { Divider } from "@nextui-org/divider"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"

const HistoryPage = () => {
    return (
        <div className="h-screen flex flex-col p-8">
            <div className="mb-7">
                <Link to={"/profile"}>
                    <Button size="default">
                        <ChevronLeft />
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl mb-2">History Poliklinik</h1>
                {/* <Divider className="md:w-1/2 mb-5" /> */}
                <Separator className="md:w-1/2 mb-5"/>
                <Card className="w-full md:w-1/2 p-3 mb-4">
                    <div className="flex flex-row justify-between mx-1 md:mx-5">
                        <div>
                            <h3 className="text-lg">Poli Umum</h3>
                            <h3 className="text-lg">Dr. Bintang alfarisyi</h3>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="text-green-500 p-3 rounded-full border-2 border-green-500">
                                001
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="w-full md:w-1/2 p-3">
                    <div className="flex flex-row justify-between mx-1 md:mx-5">
                        <div>
                            <h3 className="text-lg">Poli Umum</h3>
                            <h3 className="text-lg">Dokter Bintang</h3>
                        </div>
                        <div className="flex items-center">
                            <div className="text-red-500 p-3 rounded-full border-2 border-red-500">
                                002
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default HistoryPage