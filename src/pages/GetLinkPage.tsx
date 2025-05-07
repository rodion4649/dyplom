import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNav from "../components/SidebarNav"
import { getResults } from "../services/ExamService";
import { Result } from "../types";

const urlBase = "localhost:5173";
const getLink = (examId: string) => {
    return `${urlBase}/test/start?examId=${examId}`;
}

export default () => {
    const [results, setResults] = useState<Result[]>([]);

    const examId = localStorage.getItem("examId");

    return (
        <>
            <SidebarNav />
            <div className="page-container">
                <h1 className="page-title">Отримати посилання</h1>
                <p className="exam-description">Натисніть, щоб скопіювати посилання</p>
                <button onClick={() => {
                    navigator.clipboard.writeText(getLink(examId ?? ""))
                        .then(() => alert("Посилання скопійовано до буфера обміну"))
                        .catch(err => console.error("Не вдалося скопіювати посилання: ", err));
                }}>{getLink(examId ?? "")}</button>
                {/* <button className="button" onClick={() => {
                    const element = document.createElement("a");
                    const csvContent = results.map(r =>
                        `${r.user} отримав ${r.points} з ${r.maxPoints} і ${r.isCompleted ? "" : "не "}дійшов до кінця за ${r.minutesTaken} хв. ${r.secondsTaken} сек.`
                    ).join("\n");
                    const file = new Blob([csvContent], { type: 'text/plain' });
                    element.href = URL.createObjectURL(file);
                    element.download = "Результати";
                    document.body.appendChild(element);
                    element.click();
                }}>
                    Кнопка експорт
                </button> */}
            </div >
        </>
    )
}
