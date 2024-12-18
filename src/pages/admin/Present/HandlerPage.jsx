import useCounterStore from '@/store/counter';
import React from 'react';

const HandlerPage = () => {
    const increment = useCounterStore((state) => state.increment);
    const decrement = useCounterStore((state) => state.decrement);
    const count = useCounterStore((state) => state.count);

    const handleClick = async () => {
        increment;
        try {
            const response = await patchDataPoly(id, currentQueue)
            console.log(response)
        } catch (error) {
            console.log(response)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl mb-4 font-bold">Simple Counter</h1>
            <div className="flex items-center gap-4">
                <button
                    onClick={decrement}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    -
                </button>
                <span className="text-3xl font-semibold">{count}</span>
                <button
                    onClick={handleClick}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    +
                </button>
            </div>
        </div>
    );
};

export default HandlerPage;
