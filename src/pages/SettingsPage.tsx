import { useState, useEffect } from "react";
import SidebarNav from "../components/SidebarNav"
import { getSettings, updateSettings } from "../services/ExamService";
import { Settings } from "../types";
import { useNavigate } from "react-router-dom";

export default () => {
    const [settings, setSettings] = useState<Settings>({
        questionsOrder: undefined,
        timeLimit: 600,
    });
    const navigate = useNavigate();

    const examId = localStorage.getItem("examId");
    useEffect(() => {
        getSettings(examId ?? "").then((_settings: Settings) => {
            setSettings(_settings);
        }).catch((error) => {
            console.error("Error fetching questions:", error);
            if (error.code === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        })
    }, []);

    return (
        <>
            <SidebarNav />
            <div className="page-container">
                <h1 className="page-title">Налаштування</h1>
                <p className="field-title">Обмеження по часу в секундах</p>
                { <input type="number" className="text-input color-dark" placeholder="Обмеження в хвилинах" value={settings.timeLimit}
                    onChange={(e) => {
                        setSettings((prevSettings) => ({
                            ...prevSettings,
                            timeLimit: Number(e.target.value)
                        }))
                    }}
                />}
                <p className="field-title">Порядок питань</p>
                <div>
                    <label>
                        <div>
                            <input type="radio" name="questionsOrder" value="inOrder" checked={settings.questionsOrder === "inOrder"}
                                onChange={() => {
                                    setSettings((prevSettings) => ({
                                        ...prevSettings,
                                        questionsOrder: "inOrder"
                                    }));
                                }} />
                            <span className="radio-title">По порядку</span>
                        </div>
                    </label>
                    <label>
                        <div>
                            <input type="radio" name="questionsOrder" value="random" checked={settings.questionsOrder === "random"}
                                onChange={() => {
                                    setSettings((prevSettings) => ({
                                        ...prevSettings,
                                        questionsOrder: "random"
                                    }));
                                }} />
                            <span className="radio-title">Випадковий</span>
                        </div>
                    </label>
                </div>
                <button className="button" type="submit" onClick={() => {
                    updateSettings(examId ?? "", settings);
                }}>
                    Зберегти
                </button>
            </div>
        </>
    )
}