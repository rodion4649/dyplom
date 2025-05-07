import { Exam, GeneralData, Question, Result, Settings } from "../types";

export const createExam = async (title: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (localStorage.getItem("token")) {
                resolve("ід з назвою" + title);
            } else {
                reject({ message: "Нема такого користувача", code: 401 });
            }
        }, 1000);
    })
}

export const getExamsList = async (): Promise<Exam[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const token = localStorage.getItem("token") 
            if (token) {
                resolve([
                    {
                        id: "examId_" + token,
                        generalData: {
                            title: "Тест" + token,
                            description: "Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва "
                        },
                        questions: [{
                            questionType: "openEnded",
                            points: 15,
                            questionText: "co tam?",
                        },
                        {
                            questionType: "multipleChoice",
                            points: 1,
                            questionText: "siema",
                        }],
                        results: [{
                            user: "żółw",
                            points: 12,
                            maxPoints: 15,
                            isCompleted: false,
                            minutesTaken: 5,
                            secondsTaken: 14
                        }],
                        settings: {
                            showExplanation: true,
                            isTimeLimitPresent: false,
                            questionsOrder: "inOrder"
                        }
                    }]
                );
            } else {
                reject({ message: "Нема такого користувача", code: 401 });
            }
        }, 1000);
    })
}

export const getGeneralData = async (examId: string): Promise<GeneralData> => {
    return new Promise((resolve, reject) => {
        if (examId === "")
            reject({ message: "Нема такого екзамену", code: 404 });
        setTimeout(() => {
            if (localStorage.getItem("token")) {
                resolve({
                    title: "Тест з ід " + examId,
                    description: "Це тест"
                });
            } else {
                reject({ message: "Нема такого користувача", code: 401 });
            }
        }, 1000);
    })
}

export const createQuestion = async (
    {
        questionType,
        points,
        questionText,
        answerText,
        answers,
        correctAnswers
    }: {
        questionType: string,
        points: number,
        questionText: string,
        answerText?: string,
        answers?: { isCorrect: boolean, answerText: string }[],
        correctAnswers?: number[]
    }
) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Створено питання:", {
                questionType,
                points,
                questionText,
                answerText,
                answers,
                correctAnswers
            });
            resolve(true);
        }, 1000);
    })
}

export const getQuestions = async (examId: string): Promise<Question[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (localStorage.getItem("token")) {
                resolve([{
                    questionType: "openEnded",
                    points: 15,
                    questionText: "co tam?",
                },
                {
                    questionType: "multipleChoice",
                    points: 1,
                    questionText: "siema",
                }]);
            } else {
                reject({ message: "Нема такого користувача", code: 401 });
            }
        }, 1000);
    })
}

export const getResults = async (examId: string): Promise<Result[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (localStorage.getItem("token")) {
                resolve([{
                    user: "żółw",
                    points: 12,
                    maxPoints: 15,
                    isCompleted: false,
                    minutesTaken: 5,
                    secondsTaken: 14
                }]);
            } else {
                reject({ message: "Нема такого користувача", code: 401 });
            }
        }, 1000);
    })
}

export const getSettings = async (examId: string): Promise<Settings> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (localStorage.getItem("token")) {
                resolve({
                    showExplanation: true,
                    isTimeLimitPresent: false,
                    questionsOrder: "inOrder"
                });
            } else {
                reject({ message: "Нема такого користувача", code: 401 });
            }
        }, 1000);
    })
}

export const updateSettings = (settings: Settings) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Збережено налаштування:", settings);
            resolve(true);
        }, 1000);
    })
}