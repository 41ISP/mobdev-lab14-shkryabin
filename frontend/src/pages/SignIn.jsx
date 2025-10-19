import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { useState } from "react"
import { loginUser } from "../api/api"
import { useUserStore } from "../store/store"

const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const {setJWT} = useUserStore()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        try {
            const result = await loginUser(userData)
            if (!result.success) throw new Error(result.error)
            setJWT(result.token)
            navigate("/")
        } catch (err) {
            console.error(err)
            setErrorMessage(err.message)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Вход</h1>
                {errorMessage.length > 0 && <div className="auth-error">{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <Input
                        placeholder="Имя пользователя"
                        required
                        name="username"
                    />
                    <Input
                        placeholder="Пароль"
                        required
                        name="password"
                        type="password"
                    />
                    <Button>Войти</Button>
                </form>
                <footer className="auth-footer">
                    <Link to="/signup">Зарегистрироваться</Link>
                </footer>
            </div>
        </div>
    )
}

export default SignIn