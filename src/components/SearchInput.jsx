import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchInput = ({ defaultValue, handleChange, placeHolder }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search size={20} />
            </div>
            <Input
                type="text"
                className="block w-full p-6 ps-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeHolder}
                required
                value={defaultValue}
                onChange={handleChange}
            />
        </div>
    )
}

export default SearchInput