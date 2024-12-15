import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'

export const BackButton = ({ path }) => {
    return (
        <Link to={path}>
            <Button >
                <MoveLeft size={20} className="text-white" />
            </Button>
        </Link>
    )
}
export const NextButton = ({ path }) => {
    return (
        <Link to={path}>
            <Button >
                <MoveLeft size={20} className="text-white" />
            </Button>
        </Link>
    )
}

