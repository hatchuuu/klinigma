import { facilityServiceArray } from '@/utils/arrayDashboard'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

const FacilityServices = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Fasilitas Pelayanan
                </h2>
                <p className="text-gray-500">
                    Kami menyediakan berbagai layanan perawatan kesehatan untuk
                    memenuhi kebutuhan Anda.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-16">
                {facilityServiceArray.map((service, index) => (
                    <Card key={index} className="hover:shadow-lg">
                        <CardHeader className="flex items-center justify-center">
                            <service.icon className="text-blue-500 w-8 h-8" />
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold text-center text-gray-700">
                                {service.title}
                            </h3>
                            <p className="text-sm text-center text-gray-500">
                                {service.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default FacilityServices