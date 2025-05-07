import { urlBase } from "../consts";
import { Exam, GeneralData, Question, Result, Settings } from "../types";


export const createExam = async (title: string): Promise<Exam> => {
    const response = await fetch(`${urlBase}/createExam`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            title,
        })
    })

    if (!response.ok) {
        throw new Error("Помилка створення екзамену");
    }

    const json = await response.json();

    return json;
}

export const getExamsList = async (userId: string): Promise<Exam[]> => {
    const response = await fetch(`${urlBase}/getExamList?userId=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })

    if (!response.ok) {
        throw new Error("Помилка отримання списку екзаменів");
    }

    const json = await response.json();

    return json;

    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         const token = localStorage.getItem("token") 
    //         const userId = localStorage.getItem("userId")
    //         if (token) {
    //             resolve([
    //                 {
    //                     id: "examId_" + token,
    //                     generalData: {
    //                         title: "Тест" + token,
    //                         description: "Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва Це тестфівафіва "
    //                     },
    //                     questions: [{
    //                         questionType: "openEnded",
    //                         points: 15,
    //                         questionText: "co tam?",
    //                     },
    //                     {
    //                         questionType: "multipleChoice",
    //                         points: 1,
    //                         questionText: "siema",
    //                     }],
    //                     results: [{
    //                         user: "żółw",
    //                         points: 12,
    //                         maxPoints: 15,
    //                         isCompleted: false,
    //                         minutesTaken: 5,
    //                         secondsTaken: 14
    //                     }],
    //                     settings: {
    //                         showExplanation: true,
    //                         isTimeLimitPresent: false,
    //                         questionsOrder: "inOrder"
    //                     }
    //                 }]
    //             );
    //         } else {
    //             reject({ message: "Нема такого користувача", code: 401 });
    //         }
    //     }, 1000);
    // })
}

export const getGeneralData = async (examId: string): Promise<GeneralData> => {
    const data = await fetch(`${urlBase}/getGeneralData?examId=${examId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    const json = await data.json();
    return json;
}

export const createQuestion = async (
    {
        examId,
        questionType,
        points,
        questionText,
        answerText,
        answers,
        correctAnswers
    }: {
        examId: string,
        questionType: string,
        points: number,
        questionText: string,
        answerText?: string,
        answers?: { isCorrect: boolean, answerText: string }[],
        correctAnswers?: number[]
    }
) => {
    const response = await fetch(`${urlBase}/createQuestion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            examId,
            questionType,
            points,
            questionText,
            answerText,
            answers,
            correctAnswers
        })
    })

    if (!response.ok) {
        throw new Error("Помилка створення питання");
    }

    const json = await response.json();

    return json;
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         console.log("Створено питання:", {
    //             questionType,
    //             points,
    //             questionText,
    //             answerText,
    //             answers,
    //             correctAnswers
    //         });
    //         resolve(true);
    //     }, 1000);
    // })
}

export const getQuestion = async (examId: string, index: number): Promise<Question> => {
    const response = await fetch(`${urlBase}/getQuestion?examId=${examId}&index=${index}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })

    if (!response.ok) {
        throw new Error("Помилка отримання питань");
    }

    const json = await response.json();

    return json;

    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         if (localStorage.getItem("token")) {
    //             resolve([{
    //                 questionType: "openEnded",
    //                 points: 15,
    //                 questionText: "co tam?",
    //             },
    //             {
    //                 questionType: "multipleChoice",
    //                 points: 1,
    //                 questionText: "siema",
    //             }]);
    //         } else {
    //             reject({ message: "Нема такого користувача", code: 401 });
    //         }
    //     }, 1000);
    // })
}

export const getQuestions = async (examId: string): Promise<Question[]> => {
    const response = await fetch(`${urlBase}/getQuestions?examId=${examId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })

    if (!response.ok) {
        throw new Error("Помилка отримання питань");
    }

    const json = await response.json();

    return json;

    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         if (localStorage.getItem("token")) {
    //             resolve([{
    //                 questionType: "openEnded",
    //                 points: 15,
    //                 questionText: "co tam?",
    //             },
    //             {
    //                 questionType: "multipleChoice",
    //                 points: 1,
    //                 questionText: "siema",
    //             }]);
    //         } else {
    //             reject({ message: "Нема такого користувача", code: 401 });
    //         }
    //     }, 1000);
    // })
}

export const getResults = async (examId: string): Promise<Result[]> => {
    const response = await fetch(`${urlBase}/getResults?examId=${examId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })

    if (!response.ok) {
        throw new Error("Помилка отримання показників");
    }

    const json = await response.json();

    return json;

    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         if (localStorage.getItem("token")) {
    //             resolve([{
    //                 user: "żółw",
    //                 points: 12,
    //                 maxPoints: 15,
    //                 isCompleted: false,
    //                 minutesTaken: 5,
    //                 secondsTaken: 14
    //             }]);
    //         } else {
    //             reject({ message: "Нема такого користувача", code: 401 });
    //         }
    //     }, 1000);
    // })
}

export const getSettings = async (examId: string): Promise<Settings> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (localStorage.getItem("token")) {
                resolve({
                    showExplanation: true,
                    isTimeLimitPresent: true,
                    timeLimit : 1600,
                    questionsOrder: "inOrder"
                });
            } else {
                reject({ message: "Нема такого користувача", code: 401 });
            }
        }, 1000);
    })

    // const response = await fetch(`${urlBase}/getSettings?examId=${examId}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${localStorage.getItem("token")}`
    //     },
    // })

    // if (!response.ok) {
    //     throw new Error("Помилка отримання нашалштувань");
    // }

    // const json = await response.json();

    // return json;

}

export const updateSettings = async (examId: string, settings: Settings) => {
    const response = await fetch(`${urlBase}/getSettings?examId=${examId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(settings)
    })

    if (!response.ok) {
        throw new Error("Помилка отримання нашалштувань");
    }

    const json = await response.json();

    return json;
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         console.log("Збережено налаштування:", settings);
    //         resolve(true);
    //     }, 1000);
    // })
}