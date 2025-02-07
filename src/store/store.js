import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    token: sessionStorage.getItem("token") || null,
    setToken: (newToken) => {
        sessionStorage.setItem("token", newToken);
        set({ token: newToken })
    },
    user: null,
    logout: () => {
        sessionStorage.removeItem("token");
        set({ token: null, user: null })
    },
}))

export const useNotif = create((set) => ({
    notif: [],
    addNotif: (data) => set(
        (state) => (
            { notif: [...state.notif, { ...data, id: state.notif.length + 1 }] }
        )
    ),
    resetNotif: () => set({ notif: [] })
}))

export const useRefreshSchedules = create((set) => ({
    refresh: false,
    setRefresh: () => set((state) => ({ refresh: !state.refresh })),
}))
