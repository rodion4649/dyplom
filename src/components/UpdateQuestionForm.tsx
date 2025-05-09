import { useState } from "react";
import CreateOpenEndedQuestionForm from "./CreateOpenEndedQuestionForm";
import CreateMultipleChoiseQuestionForm from "./CreateMultipleChoiseQuestionForm.tsx";
import { Question, QuestionType } from "../types.tsx";

export default ({ onSubmit }: { onSubmit: (newQuestion:Question) => void }) => {
    const [questionType, setQuestionType] = useState<QuestionType>("MULTIPLE_CHOICE");

    return (
        <div className="add-new-question-form">
            <p className="field-title">Тип питання</p>
            <select className="text-input" value={questionType}
                onChange={(e) => {
                    setQuestionType(e.target.value as QuestionType);
                }}>
                <option value="MULTIPLE_CHOICE">Вибір з декількох варіантів</option>
                <option value="TEXT">Відкрите питання</option>
            </select>

            {questionType === "TEXT" &&
                <CreateOpenEndedQuestionForm onSubmit={onSubmit}/>
            }

            {questionType === "MULTIPLE_CHOICE" &&
                <CreateMultipleChoiseQuestionForm onSubmit={onSubmit}/>
            }
        </div>
    )
}