import { useUserStore } from "../store/store"

export const registerUser = async (userData) => {
    try {
        const response = await fetch(
            "https://kitek.ktkv.dev/feedback/api/auth/register",
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const result = await response.json()
        if (!result.success) {
            throw new Error(result.error)
        }
        return result
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await fetch(
            "https://kitek.ktkv.dev/feedback/api/auth/login",
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const result = await response.json()
        if (!result.success) {
            throw new Error(result.error)
        }
        return result
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

export const getMessages = async () => {
    try {
        const response = await fetch("https://kitek.ktkv.dev/feedback/api/messages")
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export const createMessage = async (messageData) => {
    try {
        const { jwt } = useUserStore.getState()
        const response = await fetch(
            "https://kitek.ktkv.dev/feedback/api/messages",
            {
                method: "POST",
                body: JSON.stringify(messageData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwt.token,
                },
            }
        )
        console.log(await response.json())
    } catch (error) {
        console.error(error)
    }
}

export const removeMessage = async (messageId) => {
    try {
        const { jwt } = useUserStore.getState()
        const response = await fetch(
            `https://kitek.ktkv.dev/feedback/api/messages/${messageId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + jwt.token,
                },
            }
        )
        console.log(await response.json())
    } catch (error) {
        console.error(error)
    }
}

export const reportMessage = async (messageId) => {
    try {
        const { jwt } = useUserStore.getState()
        const response = await fetch(
            `https://kitek.ktkv.dev/feedback/api/messages/${messageId}/report`,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + jwt.token,
                },
            }
        )
        console.log(await response.json())
    } catch (error) {
        console.error(error)
    }
}

export const likeMessage = async (messageId) => {
    try {
        const { jwt } = useUserStore.getState()
        const response = await fetch(
            `https://kitek.ktkv.dev/feedback/api/messages/${messageId}/like`,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + jwt.token,
                },
            }
        )
        console.log(await response.json())
    } catch (error) {
        console.error(error)
    }
}