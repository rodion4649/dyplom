import { useState } from "react"

export default () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});

    return (
        <div className="center-container">
            <div className="login-form-container">

                <h1 className="page-title">Створити обліковий запис</h1>

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
                            const newErrors: { email?: string, password?: string } = {}

                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                                newErrors.email = "Невірний формат пошти";
                            }

                            if (password.length < 6) {
                                newErrors.password = "Пароль має мати не менше 6 знаків";
                            }

                            setErrors(newErrors);
                        }}>
                        Створити обліковий запис
                    </button>
                </form>
            </div>
        </div >
    )
}