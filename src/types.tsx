export interface Exam {
    id:string,
    generalData: GeneralData,
    questions: Question[],
    results: Result[],
    settings: Settings,
}

export interface GeneralData {
    title: string,
    description: string,
}

export interface Question {
    questionType: "openEnded" | "multipleChoice",
    points: number,
    questionText: string,
    answerText?: string,
    answers?: { isCorrect: boolean, answerText: string }[],
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