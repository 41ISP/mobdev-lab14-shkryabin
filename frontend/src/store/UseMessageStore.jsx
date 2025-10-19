import { create } from "zustand"
import { getMessages } from "../api/api"

export const useMessageStore = create()((set, get) => ({
    messages: [],
    loadMessages: async () => {
        try {
            const data = await getMessages()
            set({ messages: data })
        } catch (error) {
            console.error(error)
        }
    },
}))