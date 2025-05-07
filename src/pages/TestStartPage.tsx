import { getGeneralData } from "../services/ExamService";
import { startSession } from "../services/TestService";
import { GeneralData } from "../types";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();
    const [generalData, setGeneralData] = useState<GeneralData>({ title: "назва", description: "опис" });
    const [userName, setUserName] = useState<string>("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const examId = queryParams.get("examId");

    useEffect(() => {
        const currentSessionToken = localStorage.getItem("currentSessionToken");
        if (currentSessionToken) {
            navigate("/test/question");
        } else {
            getGeneralData(examId ?? "").then((_generalData: GeneralData) => {
                setGeneralData(_generalData);
            }).catch((error) => {
                console.error("Помилка отримання даних:", error);
            })
        }
    }, []);


    return (
        <div className="test-start-page center-container">
            <div className="test-container">
                <h1 className="test-title">{generalData.title}</h1>
                <p>
                    {generalData.description}
                </p>
                <input type="text" className="text-input" placeholder="Ваше ім'я" value={userName}
                    onChange={(e) => { setUserName(e.target.value) }} />
                <button className="button full-width" onClick={() => {
                    if (userName.length) {
                        startSession(userName, examId ?? "").then((data) => {
                            localStorage.setItem("currentSessionToken", data.sessionToken);
                            navigate("/test/question");
                        }).catch((error) => {
                            console.error("Помилка початку сесії:", error);
                        })
                    } else {
                        alert("Введіть ваше ім'я");
                    }
                }}>
                    Кнопка почати
                </button>
            </div>
        </div>
    )
}