/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getTestResults, saveTestResult, deleteTestSession, getSession } from "../services/TestService";
import { Result } from "../types";

export default () => {
    const navigate = useNavigate();
    const [points, setPoints] = useState<number>(0);
    const [maxPoints, setMaxPoints] = useState<number>(0);
    const hasSaved = useRef<boolean>(false); // Use useRef instead of useState

    useEffect(() => {
        const currentSessionToken = localStorage.getItem("currentSessionToken");
        if (!currentSessionToken) {
            navigate("/test/start");
            return;
        }

        const callback = async () => {
            try {
                const result: Result = await getTestResults(currentSessionToken);
                setPoints(result.points);
                setMaxPoints(result.maxPoints);

                // Get session data to extract user and examId
                const session = await getSession(currentSessionToken);
                const user = session.userName;
                const examId = session.examId;

                // Prepare the result object with session data
                const updatedResult = {
                    ...result,
                    examId: examId,
                    user: user,
                    timeTaken: result.timeTaken, // If this field exists or calculate it
                };

                // Save result only once after getting the results
                if (!hasSaved.current) {
                    await saveTestResult(updatedResult); // Save result
                    hasSaved.current = true; // Set ref to true to avoid saving again
                }
            } catch (error) {
                console.error("Помилка отримання або збереження результату:", error);
            }
        };

        callback();

        // Empty dependency array to make sure the effect runs only once
    }, [navigate]);

    const handleFinish = async () => {
        const currentSessionToken = localStorage.getItem("currentSessionToken");
        if (currentSessionToken) {
            try {
                // Delete session from the backend
                await deleteTestSession(currentSessionToken);

                // Remove the token from localStorage
                localStorage.removeItem("currentSessionToken");

                // Navigate to login page
                navigate("/login");
            } catch (error) {
                console.error("Помилка видалення сесії:", error);
            }
        }
    };

    return (
        <div className="test-start-page center-container">
            <div className="test-container">
                <h1 className="page-title">Результати</h1>
                <p className="test-results-description">
                    Ти виконав всі завдання. Твої показники {points} з {maxPoints}
                </p>
                <button className="finish-button" onClick={handleFinish}>
                    Завершити
                </button>
            </div>
        </div>
    );
};
