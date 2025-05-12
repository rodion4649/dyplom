export interface Exam {
    id: string,
    title: string,
    description: string,
    questions: Question[],
    settings: Settings,
}

export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "SINGLE_CHOICE";

export interface SelectableAnswer {
    isCorrect: boolean,
    answerText: string
}

export interface Question {
    quesId:number
    questionType: QuestionType,
    points: number,
    questionText: string,
    answerText?: string,
    answers?: SelectableAnswer[],
}

export interface Result {
    examId: number
    user: string,
    points: number,
    maxPoints: number,
    timeTaken: number,
}

export interface Settings {
    questionsOrder?: "inOrder" | "random",
    timeLimit?: number,
}

export interface TestSession {
    id: string,
    userName: string,
    examId: number,
    startTime: number,
    timeLimit?: number,
    isCompleted: boolean,
    // це тільки ті питання, що залишилися
    questions: Question[],
    totalQuestionsNumber: number,
}
