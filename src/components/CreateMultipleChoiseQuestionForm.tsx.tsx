import { useState } from "react";
import { createQuestion } from "../services/ExamService.tsx";
import DeleteIcon from "../assets/icons/DeleteIcon.tsx";
import { Question } from "../types.tsx";

export default ({ onSubmit }: { onSubmit: (newQuestion: Question) => void }) => {
    const [pointsString, setPointsString] = useState("5");
    const [questionText, setQuestionText] = useState("");
    const [answers, setAnswers] = useState<{ isCorrect: boolean; answerText: string }[]>([
        { isCorrect: false, answerText: "" },
        { isCorrect: false, answerText: "" },
        { isCorrect: false, answerText: "" }
    ]);

    const [errors, setErrors] = useState<{
        pointsError?: string;
        questionError?: string;
        answerError?: string[];
        correctAnswerError?: string;
        minimumAnswerError?: string;
    }>({});

    const validateFields = () => {
        const newErrors: typeof errors = {};
        const parsedPoints = Number(pointsString);

        if (!pointsString.trim() || isNaN(parsedPoints)) {
            newErrors.pointsError = "Введіть вірне число";
        }

        if (!questionText.trim()) {
            newErrors.questionError = "Введіть питання";
        }

        const answerErrors: string[] = [];
        answers.forEach((answer, index) => {
            if (!answer.answerText.trim()) {
                answerErrors[index] = "Введіть відповідь";
            }
        });
        if (answerErrors.length > 0) {
            newErrors.answerError = answerErrors;
        }

        if (!answers.some(a => a.isCorrect)) {
            newErrors.correctAnswerError = "Позначте принаймні одну правильну відповідь";
        }

        if (answers.length < 2) {
            newErrors.minimumAnswerError = "Має бути принаймні дві відповіді";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateAnswer = (index: number, field: "answerText" | "isCorrect", value: string | boolean) => {
        setAnswers(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const removeAnswer = (index: number) => {
        setAnswers(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="answer-second-row">
                <p>Кількість очок</p>
                <input
                    className="text-input color-dark"
                    value={pointsString}
                    onChange={(e) => setPointsString(e.target.value)}
                />
                {errors.pointsError && <p className="error-text">{errors.pointsError}</p>}
            </div>

            <p className="field-title">Питання</p>
            <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="text-area create-question-text-area"
            />
            {errors.questionError && <p className="error-text">{errors.questionError}</p>}

            <div>
                {answers.map((answer, index) => (
                    <div className="answer" key={index}>
                        <div className="answer-first-row">
                            <div>{index + 1}.</div>
                            <div>
                                <span>Правильна відповідь</span>
                                <input
                                    type="checkbox"
                                    className="correct-answer-checkbox"
                                    checked={answer.isCorrect}
                                    onChange={(e) => updateAnswer(index, "isCorrect", e.target.checked)}
                                />
                            </div>
                            <button onClick={() => removeAnswer(index)}>
                                <DeleteIcon />
                            </button>
                        </div>
                        <textarea
                            className="text-area create-question-text-area"
                            value={answer.answerText}
                            onChange={(e) => updateAnswer(index, "answerText", e.target.value)}
                        />
                        {errors.answerError?.[index] && (
                            <p className="error-text">{errors.answerError[index]}</p>
                        )}
                    </div>
                ))}

                {errors.correctAnswerError && (
                    <p className="error-text">{errors.correctAnswerError}</p>
                )}
                {errors.minimumAnswerError && (
                    <p className="error-text">{errors.minimumAnswerError}</p>
                )}

                <button
                    className="button"
                    onClick={() => {
                        setAnswers(prev => [...prev, { isCorrect: false, answerText: "" }]);
                    }}
                >
                    Додати відповідь
                </button>
            </div>

            <button
                className="button full-width"
                onClick={async () => {
                    if (validateFields()) {
                        const examId = localStorage.getItem("examId");
                        const newQuestion: Question = {
                            quesId: 0,
                            questionType: "MULTIPLE_CHOICE",
                            points: Number(pointsString),
                            questionText,
                            answers
                        };

                        const quesId = await createQuestion(examId ?? "", newQuestion);
                        onSubmit({ ...newQuestion, quesId });
                    }
                }}
            >
                Додати питання
            </button>
        </>
    );
};
