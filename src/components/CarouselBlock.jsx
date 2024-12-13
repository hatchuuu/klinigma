import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "./ui/carousel"

const CarouselBlock = ({ size }) => {
    return (
        <Carousel className="">
            <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className={`pl-2 w-${size}`}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center aspect-square justify-center p-6">
                                    <span className="text-2xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default CarouselBlock