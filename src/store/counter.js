import { create } from 'zustand';

const useCounterStore = create((set) => ({
    count: 0, // State awal
    increment: () => set((state) => ({ count: state.count + 1 })), // Tambah 1
    decrement: () => set((state) => ({ count: state.count - 1 })), // Kurangi 1
}));

export default useCounterStore;

