import { useState } from "react";
import CreateOpenEndedQuestionForm from "./CreateOpenEndedQuestionForm";
import CreateMultipleChoiseQuestionForm from "./CreateMultipleChoiseQuestionForm.tsx";
import { Question, QuestionType } from "../types.tsx";
import CreateSingleChoiseQuestionForm from "./CreateSingleChoiseQuestionForm.tsx";

export default ({ onSubmit }: { onSubmit: (newQuestion:Question) => void }) => {
    const [questionType, setQuestionType] = useState<QuestionType>("MULTIPLE_CHOISE");

    return (
        <div className="add-new-question-form">
            <p className="field-title">Тип питання</p>
            <select className="text-input color-dark" value={questionType}
                onChange={(e) => {
                    setQuestionType(e.target.value as QuestionType);
                }}>
                <option value="multipleChoice">Вибір декількох</option>
                <option value="singleChoice">Вибір одного</option>
                <option value="text">Відкрите питання</option>
            </select>

            {questionType === "TEXT" &&
                <CreateOpenEndedQuestionForm onSubmit={onSubmit}/>
            }

            {questionType === "MULTIPLE_CHOISE" &&
                <CreateMultipleChoiseQuestionForm onSubmit={onSubmit}/>
            }

            {questionType === "SINGLE_CHOISE" &&
                <CreateSingleChoiseQuestionForm onSubmit={onSubmit}/>
            }

        </div>
    )
}