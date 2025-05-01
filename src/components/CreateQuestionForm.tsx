import { useState } from "react";
import CreateOpenEndedQuestionForm from "./CreateOpenEndedQuestionForm";
import CreateMultipleChoiseQuestionForm from "./CreateMultipleChoiseQuestionForm.tsx";
import { Question } from "../types.tsx";

export default ({ onSubmit }: { onSubmit: (newQuestion:Question) => void }) => {
    const [questionType, setQuestionType] = useState("multiple-choice");

    return (
        <div className="add-new-question-form">
            <p className="field-title">Тип питання</p>
            <select className="text-input" value={questionType}
                onChange={(e) => {
                    setQuestionType(e.target.value);
                }}>
                <option value="multiple-choice">Вибір з декількох варіантів</option>
                <option value="open-ended">Відкрите питання</option>
            </select>

            {questionType === "open-ended" &&
                <CreateOpenEndedQuestionForm onSubmit={onSubmit}/>
            }

            {questionType === "multiple-choice" &&
                <CreateMultipleChoiseQuestionForm onSubmit={onSubmit}/>
            }

        </div>
    )
}