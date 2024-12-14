import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, House, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()
    const token = localStorage.getItem("token")
    return (
        <div className={`w-full bg-transparent ${!token ? "hidden" : "fixed"} bottom-3 px-4`}>
            <div className='bg-primary w-full py-2 rounded-2xl'>
                <div className='flex justify-evenly items-center'>
                    <Link to={"/dashboard"}>
                        <Button variant="navbar">
                            <House size={20} />
                            <p className=' text-xs'>HOME</p>
                        </Button>
                    </Link>
                    <Link to={"/booking"}>
                        <Button variant="navbar">
                            <Calendar size={20} />
                            <p className=' text-xs'>BOOKING</p>
                        </Button>
                    </Link>
                    <Link to={"/profile"}>
                        <Button variant="navbar">
                            <User size={20} />
                            <p className=' text-xs'>PROFILE</p>
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Navbar