import { useState } from "react";
import { createExam } from "../services/ExamService.tsx";
import { useNavigate } from "react-router-dom";

export default () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    return (
        <div className="add-new-question-form">
            <p className="field-title">Назва контрольної</p>
            <input className="text-input" value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}>
            </input>
            <div>
                <button className="button" onClick={async () => {
                    if (title.length === 0) {
                        alert("Введіть назву контрольної");
                    } else {
                        const newExamId = await createExam(title);
                        navigate(`/start?id=${newExamId}`);
                    }
                }}>
                    Створити
                </button>
            </div>
        </div>
    )
}