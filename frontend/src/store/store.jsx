import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useUserStore = create()(
    persist(
        (set, get) => ({
            jwt: undefined,
            setJWT: (token) =>
                set((state) => ({
                    ...state,
                    jwt: { token: token, ...JSON.parse(atob(token.split('.')[1])) },
                })),
            clearJWT: () => set((state) => ({ ...state, jwt: undefined })),
        }),
        {
            name: "user",
            storage: createJSONStorage(() => localStorage),
        }
    )
)