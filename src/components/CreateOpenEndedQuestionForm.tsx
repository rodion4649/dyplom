import { useState } from "react";
import { createQuestion } from "../services/ExamService";
import { Question, QuestionType } from "../types";

export default (({ onSubmit }: { onSubmit: (newQuestion: Question) => void }) => {
    const [questionText, setQuestionText] = useState("");
    const [answerText, setAnswerText] = useState("");
    const [pointsString, setPointsString] = useState("5");

    const [errors, setErrors] = useState<{
        pointsError?: string; questionError?: string; answerError?: string
    }>({});

    const validateFields = () => {
        const newErrors: {
            pointsError?: string; questionError?: string; answerError?: string
        } = {}

        if (!pointsString.trim() || isNaN(Number(pointsString))) {
            newErrors.pointsError = "Введіть вірне число";
        }
        if (!questionText.length) {
            newErrors.questionError = "Введіть питання";
        }
        if (!answerText.length) {
            newErrors.answerError = "Введіть відповідь";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    return (
        <>
            <div className="answer-second-row">
                <p>Кількість очок</p>
                <input className="text-input color-dark" value={pointsString}
                    onChange={(e) => { setPointsString(e.target.value) }}
                />
                {errors.pointsError &&
                    <p className="error-text">Введіть вірне число</p>}
            </div>
            <p className="field-title">Питання</p>
            <textarea value={questionText} onChange={(e) => { setQuestionText(e.target.value) }} className="text-area create-question-text-area" />
            {errors?.questionError &&
                <p className="error-text">{errors.questionError}</p>}
            <p className="field-title">Відповідь</p>
            <textarea value={answerText} onChange={(e) => { setAnswerText(e.target.value) }}
                className="text-area create-question-text-area" />
            {errors?.answerError &&
                <p className="error-text">{errors.answerError}</p>}
            <button className="button full-width"
                onClick={async () => {
                    if (validateFields()) {
                        const examId = localStorage.getItem("examId");
                        const newQuestion = {
                            questionType: "openEnded" as QuestionType,
                            points: Number(pointsString),
                            questionText: questionText,
                            answerText: answerText,
                        };
                        createQuestion(examId ?? "", newQuestion).then(() => {
                            onSubmit(newQuestion);
                        })
                    }
                }}>
                Додати питання
            </button>
        </>
    )
})