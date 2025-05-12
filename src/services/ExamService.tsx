import { urlBase } from "../consts";
import { Exam, Question, Result, Settings } from "../types";

export const createExam = async (title: string): Promise<Exam> => {
    const response = await fetch(`${urlBase}/quiz/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            title,
        }),
    });

    if (!response.ok) {
        throw new Error("Помилка створення екзамену");
    }

    const json = await response.json();

    return json;
};

export const getExamsList = async (): Promise<Exam[]> => {
    const response = await fetch(`${urlBase}/quiz/my-quizzes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Помилка отримання списку екзаменів");
    }

    const json = await response.json();

    return json;
};

export const getExamData = async (examId: string): Promise<Exam> => {
    const data = await fetch(`${urlBase}/quiz/${examId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const json = await data.json();
    return json;
};

export const createQuestion = async (
    examId: string,
    {
        questionType,
        points,
        questionText,
        answerText,
        answers,
    }: Question
) => {
    const response = await fetch(`${urlBase}/question/${examId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            examId,
            questionType,
            points,
            questionText,
            answerText,
            answers,
        }),
    });

    console.log(JSON.stringify({
        examId,
        questionType,
        points,
        questionText,
        answerText,
        answers,
    }))
    if (!response.ok) {
        throw new Error("Помилка створення питання");
    }

    const json = await response.json();

    return json;
}

export const deleteExam = async (examId: string): Promise<void> => {
    const response = await fetch(`${urlBase}/quiz/${examId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Помилка видалення екзамену");
    }
};


export const deleteQuestion = async (qid: number): Promise<void> => {
    const response = await fetch(`${urlBase}/question/${qid}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to delete question with id ${qid}`);
    }
};


export const getQuestions = async (examId: string): Promise<Question[]> => {
    // return new Promise((resolve) => {
    //     resolve([{
    //         quesId: 1,
    //         points: 5,
    //         questionText: "a?",
    //         questionType: "MULTIPLE_CHOICE",
    //         answers: [{
    //             answerText: "1",
    //             isCorrect: true,
    //         },
    //         {
    //             answerText: "2",
    //             isCorrect: false,
    //         },
    //         {
    //             answerText: "1",
    //             isCorrect: false,
    //         }]
    //     },
    //     {
    //         quesId: 3,
    //         points: 5,
    //         questionText: "a?",
    //         questionType: "SINGLE_CHOICE",
    //         answers: [{
    //             answerText: "1",
    //             isCorrect: true,
    //         },
    //         {
    //             answerText: "2",
    //             isCorrect: false,
    //         },
    //         {
    //             answerText: "1",
    //             isCorrect: false,
    //         }]
    //     },
    //     {
    //         quesId: 4,
    //         points: 5,
    //         questionText: "a?",
    //         questionType: "TEXT",
    //         answerText: "odpowiedź",
    //     }]);
    // });

    const response = await fetch(`${urlBase}/question?examId=${examId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Помилка отримання питань");
    }

    const json = await response.json();

    return json;
};

export const getResults = async (examId: string): Promise<Result[]> => {
    const response = await fetch(`${urlBase}/quiz/${examId}/results`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Помилка отримання показників");
    }

    const json = await response.json();

    return json;
};

export const getSettings = async (examId: string): Promise<Settings> => {
    const response = await fetch(`${urlBase}/quiz/${examId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Помилка отримання показників");
    }

    const json = await response.json();

    return json;
};

export const updateSettings = async (examId: string, settings: Settings) => {
    const response = await fetch(`${urlBase}/quiz/${examId}/settings`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(settings),
    });

    if (!response.ok) {
        throw new Error("Помилка отримання нашалштувань");
    }

    const json = await response.json();

    return json;
};

export const updateExamData = async (examId: string, data: Pick<Exam, "title" | "description">) => {
    const response = await fetch(`${urlBase}/quiz/${examId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Помилка оновлення даних тесту");
    }

    const json = await response.json();
    return json;
};