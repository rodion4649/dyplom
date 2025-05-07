import { useState } from "react";
import { SelectableAnswer } from "../types";

export default ({ answers, onSubmit }: { answers: SelectableAnswer[], onSubmit: (indexes: number[]) => void }) => {

    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

    const toggleAnswer = (index: number) => {
        setSelectedAnswers((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <>
            <p>Кілька відповідей</p>
            {answers.map((answer, index) => {
                return (
                    <button
                        key={index}
                        className={`answer full-width ${selectedAnswers.includes(index) ? "answer-selected" : ""}`}
                        onClick={() => toggleAnswer(index)}
                    >
                        <div className="answer-first-row">
                            <p>
                                {index + 1}. {answer.answerText}
                            </p>
                        </div>
                    </button>
                );
            })}
            <button
                className="button full-width"
                onClick={() => {
                    if (selectedAnswers.length) {
                        setSelectedAnswers([]);
                        onSubmit(selectedAnswers);
                    }
                }}
            >
                Наступне питання
            </button>
        </>
    );
};