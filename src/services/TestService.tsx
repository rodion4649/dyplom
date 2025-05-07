import { urlBase } from "../consts";
import { TestResults, TestSession } from "../types";

export const startSession = async (userName: string, examId: string) => {
    return new Promise((resolve) => {
        resolve(true);
    })

    const response = await fetch(`${urlBase}/startSession`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName,
            examId
        })
    })

    if (!response.ok) {
        throw new Error("Помилка початку сесії");
    }

    const json = await response.json();
    return json;
}

export const getSession = async (): Promise<TestSession> => {
    return new Promise((resolve) => {
        resolve({
            id: "",
            userName: "zalupa",
            examId: "",
            startTime: 0,
            isCompeted: false,
            questions: [

                {
                    questionType: "text",
                    points: 15,
                    questionText: "1?",
                    answerText: "1",
                },
                {
                    questionType: "multipleChoice",
                    points: 15,
                    questionText: "2?",
                    answers: [
                        { isCorrect: true, answerText: "1" },
                        { isCorrect: false, answerText: "a2" },
                        { isCorrect: false, answerText: "3" },
                        { isCorrect: false, answerText: "4" }
                    ]
                },
                {
                    questionType: "singleChoice",
                    points: 15,
                    questionText: "3?",
                    answers: [
                        { isCorrect: true, answerText: "1" },
                        { isCorrect: false, answerText: "2" },
                        { isCorrect: false, answerText: "3b" },
                        { isCorrect: false, answerText: "4" }
                    ]
                }
            ],
            totalQuestionsNumber: 3
        });
    })

    const response = await fetch(`${urlBase}/getSession`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("currentSessionToken")}`
        }
    })

    if (!response.ok) {
        throw new Error("Помилка отримання сесії");
    }

    const json = await response.json();
    return json;
}

export const sendAnswer = async (answer: string | number | number[]): Promise<boolean> => {
    return new Promise((resolve) => {
        resolve(true);
    })
    const response = await fetch(`${urlBase}/sendAnswer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("currentSessionToken")}`
        }, body: JSON.stringify({

        })
    })

    if (!response.ok) {
        throw new Error("Помилка надсилання відповіді");
    }

    const json = await response.json();
    return json;
}

export const getTestResults = async (): Promise<TestResults> => {
    return new Promise((resolve) => {
        resolve({
            points: 1,
            maxPoints: 10,
            timeTaken: 0
        });
    })

    const response = await fetch(`${urlBase}/getTestResults`, {
        method: "Get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("currentSessionToken")}`
        }
    })

    if (!response.ok) {
        throw new Error("Помилка отримання показників");
    }

    const json = await response.json();
    return json;
}

