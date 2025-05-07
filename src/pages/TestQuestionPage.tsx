import { useEffect, useState } from "react";
import { Question } from "../types";
import { useNavigate } from "react-router-dom";
import { getSession, sendAnswer } from "../services/TestService";
import SingleChoiseAnswer from "../components/SingleChoiseAnswer";
import MultipleChoiseAnswer from "../components/MultipleChoiseAnswer";
import TextAnswer from "../components/TextAnswer";

export default () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([{
        answers: [],
        questionType: "text",
        points: 0,
        questionText: ""
    }]);
    const [questionsNumber, setQuestionsNumber] = useState<number>(0);


    useEffect(() => {
        const callback = async () => {

            getSession().then((data) => {
                if (data.isCompeted || (data.timeLimit && data.startTime + data.timeLimit * 1000 < Date.now())) {
                    navigate("/test/result");
                } else {
                    setQuestions(data.questions);
                    setQuestionsNumber(data.totalQuestionsNumber);
                }
            }).catch((error) => {
                console.error("Помилка отримання даних:", error);
                navigate("/test/start");
            })
            // const settings = await getSettings(examId ?? "")
            // setExamSettings(settings);
            // if (settings.timeLimit) {
            //     const interval = setInterval(() => {
            //         const currentTime = Date.now();
            //         const timeDiff = Math.floor(settings.timeLimit as number - (currentTime - startTime) / 1000);
            //         const minutesLeft = Math.floor(timeDiff / 60);
            //         const secondsLeft = timeDiff % 60;
            //         setTimeLeft({ minutes: minutesLeft, seconds: secondsLeft });
            //     }, 1000);
            //     return () => clearInterval(interval);
            // }
        }
        callback();
    }, []);


    const onSubmit = (answer: string | number | number[]) => {
        sendAnswer(answer).then(() => {
            if (questions && questions?.length > 1) {
                setQuestions((prevValue) => {
                    const newQuestions = [...prevValue];
                    return newQuestions.slice(1);
                });
            } else {
                navigate("/test/result");
            }
        })
    }

    return (
        <>
            <div className="test-start-page center-container">
                {/* <div>{timeLeft}</div> */}
                <div className="test-container">
                    {
                        // examSetting?.timeLimit &&
                        // <div className="test-time-limit">
                        //     <p>Час до закінчення: {timeLeft.minutes ? `${timeLeft.minutes} хв.` : ""} {timeLeft.seconds} сек.</p>
                        // </div>
                    }
                    {questions &&
                        <p>{questionsNumber - questions?.length + 1} з {questionsNumber}</p>
                    }
                    <h1 className="test-title">{questions?.[0].questionText}</h1>
                    {questions?.[0].questionType === "singleChoice" && questions?.[0].answers &&
                        <SingleChoiseAnswer answers={questions?.[0].answers} onSubmit={onSubmit} />
                    }
                    {questions?.[0].questionType === "multipleChoice" && questions?.[0].answers &&
                        <MultipleChoiseAnswer answers={questions?.[0].answers} onSubmit={onSubmit} />
                    }
                    { }
                    {questions?.[0].questionType === "text" &&
                        <TextAnswer onSubmit={onSubmit} />
                    }
                </div>
            </div>
        </>
    )
}