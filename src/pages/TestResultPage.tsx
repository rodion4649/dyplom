import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTestResults } from "../services/TestService";

export default () => {
    const navigate = useNavigate();
    const [points, setPoints] = useState<number>(0);
    const [maxPoints, setMaxPoints] = useState<number>(0);


    useEffect(() => {
        const currentSessionToken = localStorage.getItem("currentSessionToken");
        if (!currentSessionToken) {
            navigate("/test/start");
        }
        const callback = async () => {
            getTestResults().then((data) => {
                setPoints(data.points);
                setMaxPoints(data.maxPoints);
            }).catch((error) => {
                console.error("Помилка отримання даних:", error);
            })

        }
        callback();
    }, []);

    return (
        <>
            <div className="test-start-page center-container">
                <div className="test-container">
                    <h1 className="page-title">Результати</h1>
                    <p className="test-results-description">Ти виконав всі завдання. Твої показники {points} з {maxPoints}</p>
                </div>
            </div>
        </>
    )
}