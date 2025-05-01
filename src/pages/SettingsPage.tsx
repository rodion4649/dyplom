import { useState, useEffect } from "react";
import SidebarNav from "../components/SidebarNav"
import { getSettings, updateSettings } from "../services/ExamService";
import { Settings } from "../types";
import { useNavigate } from "react-router-dom";

export default () => {
    const [settings, setSettings] = useState<Settings>({
        showExplanation: undefined,
        isTimeLimitPresent: undefined,
        questionsOrder: undefined,
        timeLimit: 10,
    });
    const navigate = useNavigate();

    useEffect(() => {
        getSettings("examId").then((_settings: Settings) => {
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
                <p className="field-title">Показувати поясення після відповіді</p>
                <div>
                    <label>
                        <div>
                            <input type="radio" name="showExplanation" value="yes" checked={settings.showExplanation === true}
                                onChange={() => {
                                    setSettings((prevSettings) => ({
                                        ...prevSettings,
                                        showExplanation: !prevSettings.showExplanation
                                    }));
                                }} />
                            <span className="radio-title">Так</span>
                        </div>
                    </label>
                    <label>
                        <div>
                            <input type="radio" name="showExplanation" value="no" checked={settings.showExplanation === false}
                                onChange={() => {
                                    setSettings((prevSettings) => ({
                                        ...prevSettings,
                                        showExplanation: !prevSettings.showExplanation
                                    }));
                                }} />
                            <span className="radio-title">Ні</span>
                        </div>
                    </label>
                </div>
                <p className="field-title">Обмеження по часу</p>
                <div>
                    <label>
                        <div>
                            <input type="radio" name="isTimeLImitPresent" value="yes" checked={settings.isTimeLimitPresent === true}
                                onChange={() => {
                                    setSettings((prevSettings) => ({
                                        ...prevSettings,
                                        isTimeLimitPresent: !prevSettings.isTimeLimitPresent
                                    }));
                                }} />
                            <span className="radio-title">Присутнє</span>
                        </div>
                    </label>
                    <label>
                        <div>
                            <input type="radio" name="isTimeLImitPresent" value="no" checked={settings.isTimeLimitPresent === false}
                                onChange={() => {
                                    setSettings((prevSettings) => ({
                                        ...prevSettings,
                                        isTimeLimitPresent: !prevSettings.isTimeLimitPresent
                                    }));
                                }} />
                            <span className="radio-title">Відсутнє</span>
                        </div>
                    </label>
                </div>
                {settings.isTimeLimitPresent && <input type="number" className="text-input" placeholder="Обмеження в хвилинах" value={settings.timeLimit}
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
                    updateSettings(settings);
                }}>
                    Зберегти
                </button>
            </div>
        </>
    )
}