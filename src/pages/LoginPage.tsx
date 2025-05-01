import { useState } from "react"
import { login } from "../services/LoginService";
import { useNavigate } from "react-router-dom";

export default () => {
    const [email, setEmail] = useState<string>("1@g.c");
    const [password, setPassword] = useState<string>("11111111");
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
    const navigate = useNavigate();

    const validateFields = () => {
        const newErrors: { email?: string, password?: string } = {}

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Невірний формат пошти";
        }

        if (password.length < 6) {
            newErrors.password = "Пароль має мати не менше 6 знаків";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    return (
        <div className="center-container">
            <div className="login-form-container">

                <h1 className="page-title">Зайти в обліковий запис</h1>

                <form>
                    <p>Пошта</p>
                    <input className="login-form-input" type="text" placeholder="Ваша скринька"
                        value={email} onChange={(event) => {
                            setEmail(event.target.value)
                        }} />
                    <p className="error-text">{errors?.email}</p>

                    <p>Пароль</p>
                    <input className="login-form-input" type="password" placeholder="Ваш пароль"
                        value={password} onChange={(event) => {
                            setPassword(event.target.value)
                        }} />
                    <p className="error-text">{errors?.password}</p>

                    <button className="login-form-button" type="submit"
                        onClick={(event) => {
                            event.preventDefault();

                            if (validateFields()) {
                                login({ email, password }).then((response) => {
                                    if (response?.data?.token && response.status === 200) {
                                        localStorage.setItem("token", response.data.token);
                                        navigate("/start");
                                    } else {
                                        console.error("Статус", response.status);
                                        console.error("Токен", response?.data?.token);
                                        setErrors({ email: "Невірна пошта або пароль" });

                                        setErrors({ email: "Сталася помилка" });
                                    }
                                }).catch((error) => {
                                    console.error("Login failed", error);
                                    setErrors({ email: "Невірна пошта або пароль" });
                                })
                            }
                        }}>
                        Зайти в обліковий запис
                    </button>
                </form>
            </div>
        </div >
    )
}