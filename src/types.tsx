export interface Exam {
    id: string,
    generalData: GeneralData,
    questions: Question[],
    results: Result[],
    settings: Settings,
}

export interface GeneralData {
    title: string,
    description: string,
}

export type QuestionType = "text" | "multipleChoice" | "singleChoice";

export interface SelectableAnswer {
    isCorrect: boolean,
    answerText: string
}

export interface Question {
    questionType: QuestionType,
    points: number,
    questionText: string,
    answerText?: string,
    answers?: SelectableAnswer[],
}

export interface Result {
    user: string,
    points: number,
    maxPoints: number,
    isCompleted: boolean,
    minutesTaken: number,
    secondsTaken: number,
}

export interface Settings {
    showExplanation?: boolean,
    isTimeLimitPresent?: boolean,
    questionsOrder?: "inOrder" | "random",
    timeLimit?: number,
}

export interface TestSession {
    id: string,
    userName: string,
    examId: string,
    startTime: number,
    timeLimit?: number,
    isCompeted: boolean,
    // це тільки ті питання, що залишилися
    questions: Question[],
    totalQuestionsNumber: number,
}

export interface TestResults {
    points: number,
    maxPoints: number,
    timeTaken: number,
}