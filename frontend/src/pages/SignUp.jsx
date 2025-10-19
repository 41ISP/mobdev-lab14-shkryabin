import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../api/api"
import { useUserStore } from "../store/store"

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { setJWT } = useUserStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (e.target.password.value != e.target.password2.value) {
            setErrorMessage("Пароли не совпадают")
            return
        }

        const userData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        try {
            const result = await registerUser(userData)
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
                <h1 className="auth-title">Регистрация</h1>
                {errorMessage.length > 0 && <div className="auth-error">{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <Input required name="username" placeholder="Введите ник" />
                    <Input required name="email" type="email" placeholder= "Введите почту" />
                    <Input required name="password" type="password" placeholder="Введите пароль"/>
                    <Input required name="password2" type="password"placeholder="Повторите пароль" />
                    <Button>Зарегистрироваться</Button>
                </form>
                <footer className="auth-footer">
                    <Link to="/signin">Войти</Link>
                </footer>
            </div>
        </div>
    )
}

export default SignUp