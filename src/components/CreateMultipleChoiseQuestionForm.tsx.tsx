import { useState } from "react";
import { createQuestion } from "../services/ExamService.tsx";
import DeleteIcon from "../assets/icons/DeleteIcon.tsx";
import { Question } from "../types.tsx";

export default ({ onSubmit }: { onSubmit: (newQuestion: Question) => void }) => {
    const [pointsString, setPointsString] = useState("5");

    const [questionText, setQuestionText] = useState("");
    const [answers, setAnswers] = useState<{ isCorrect: boolean, answerText: string }[]>([{ isCorrect: false, answerText: "" }, { isCorrect: false, answerText: "" }, { isCorrect: false, answerText: "" }]);

    const [errors, setErrors] = useState<{
        pointsError?: string; questionError?: string; answerError?: string[]
    }>({});

    const validateFields = () => {
        const newErrors: {
            pointsError?: string; questionError?: string; answerError?: string[]
        } = {}

        if (!pointsString.trim() || isNaN(Number(pointsString))) {
            newErrors.pointsError = "Введіть вірне число";
        }
        if (!questionText.length) {
            newErrors.questionError = "Введіть питання";
        }
        answers.forEach((answer, index) => {
            if (!answer.answerText.length) {
                if (!newErrors.answerError) {
                    newErrors.answerError = [];
                }
                newErrors.answerError[index] = "Введіть відповідь";
            }
        })

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
                {isNaN(Number(pointsString)) &&
                    <p className="error-text">Введіть вірне число</p>}
            </div>
            <p className="field-title">Питання</p>

            <textarea value={questionText} onChange={(e) => { setQuestionText(e.target.value) }} className="text-area create-question-text-area" />
            <p className="error-text">{errors.questionError}</p>

            <div>
                {answers.map((answer, index) => (
                    <div className="answer">
                        <div className="answer-first-row">
                            <div>
                                {index + 1}.
                            </div>
                            <div>
                                <span>Правильна відповідь</span>
                                <input type="checkbox" className="correct-answer-checkbox" checked={answer.isCorrect}
                                    onChange={(e) => {
                                        setAnswers(() => {
                                            const newAnswers = [...answers];
                                            newAnswers[index].isCorrect = e.target.checked;
                                            return newAnswers;
                                        })
                                    }} />
                            </div>
                            <button onClick={() => {
                                setAnswers(() => {
                                    const newAnswers = [...answers];
                                    newAnswers.splice(index, 1);
                                    return newAnswers;
                                })
                            }}>
                                <DeleteIcon />
                            </button>
                        </div>
                        <textarea className="text-area create-question-text-area"
                            value={answer.answerText} onChange={(e) => {
                                setAnswers(() => {
                                    const newAnswers = [...answers];
                                    newAnswers[index].answerText = e.target.value;
                                    return newAnswers;
                                })
                            }} />
                        <p className="error-text">{errors?.answerError?.[index]}</p>
                    </div>
                ))}
                <button className="button" onClick={() => {
                    setAnswers(() => {
                        const newAnswers = [...answers];
                        newAnswers.push({ isCorrect: false, answerText: "" });
                        return newAnswers;
                    })
                }}>
                    Додати відповідь
                </button>
            </div>
            <button className="button full-width"
                onClick={async () => {
                    if (validateFields()) {
                        const examId = localStorage.getItem("examId");
                        const newQuestion: Question = {
                            questionType: "MULTIPLE_CHOICE",
                            points: Number(pointsString),
                            questionText,
                            answers
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
}