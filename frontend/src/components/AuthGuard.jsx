import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/store"

const AuthGuard = ({ children }) => {
    const navigate = useNavigate()
    const { jwt } = useUserStore()
    
    useEffect(() => {
        if (!jwt) navigate("/signin")
    }, [jwt, navigate])
    
    return children
}

export default AuthGuard