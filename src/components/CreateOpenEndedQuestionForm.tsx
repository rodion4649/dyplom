import { useState } from "react";
import { createQuestion, updateQuestion } from "../services/ExamService";
import { Question } from "../types";

export default ({ startingValues, onSubmit }: {
    startingValues?: { quesId: number, startingPoints?: number, startingQuestionText: string, startingAnswerText?: string },
    onSubmit: (newQuestion: Question) => void
}) => {
    const [pointsString, setPointsString] = useState(startingValues?.startingPoints?.toString() ?? "5");
    const [questionText, setQuestionText] = useState(startingValues?.startingQuestionText ?? "");
    const [answerText, setAnswerText] = useState(startingValues?.startingAnswerText ?? "");

    const [errors, setErrors] = useState<{
        pointsError?: string;
        questionError?: string;
        answerError?: string;
    }>({});

    const validateFields = () => {
        const newErrors: typeof errors = {};

        if (!pointsString.trim() || isNaN(Number(pointsString))) {
            newErrors.pointsError = "Введіть вірне число";
        }

        if (!questionText.trim()) {
            newErrors.questionError = "Введіть питання";
        }

        if (!answerText.trim()) {
            newErrors.answerError = "Введіть відповідь";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        const examId = localStorage.getItem("examId");
        const newQuestion: Question = {
            quesId: 1,
            questionType: "TEXT",
            points: Number(pointsString),
            questionText,
            answerText,
        };

        if (!startingValues?.quesId) {
            const { quesId } = await createQuestion(examId ?? "", newQuestion);
            onSubmit({ ...newQuestion, quesId });
        } else {
            const { quesId } = await updateQuestion(startingValues?.quesId, newQuestion);
            onSubmit({ ...newQuestion, quesId });
        };
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
                className="text-area create-question-text-area"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
            />
            {errors.questionError && <p className="error-text">{errors.questionError}</p>}

            <p className="field-title">Відповідь</p>
            <textarea
                className="text-area create-question-text-area"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
            />
            {errors.answerError && <p className="error-text">{errors.answerError}</p>}

            <button className="button full-width" onClick={handleSubmit}>
                Додати питання
            </button>
        </>
    );
};
