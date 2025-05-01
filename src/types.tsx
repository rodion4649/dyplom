export interface Question {
    questionType: "openEnded" | "multipleChoice",
    points: number,
    questionText: string,
    answerText?: string,
    answers?: { isCorrect: boolean, answerText: string }[],
    // correctAnswers?: number[]
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