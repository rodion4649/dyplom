import { useEffect, useState } from "react";
import DeleteIcon from "../assets/icons/DeleteIcon.tsx";
import { Exam } from "../types.tsx";
import { getExamsList } from "../services/ExamService.tsx";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal.tsx";
import CreateExamForm from "../components/CreateExamForm.tsx";

export default () => {
    const [isCreateModalShown, setIsCreateModalShown] = useState(false);
    const [examsList, setExamsList] = useState<Exam[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getExamsList().then((exams: Exam[]) => {
            setExamsList(exams);
        }).catch((error) => {
            console.error("Помилка отримання екзаменів:", error);
            if (error.code === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        })
    }, []);

    return (
        <>
            <div className="full-page-container">
                <div>
                    <h1 className="page-title">Контрольні</h1>
                    <div className="table" >
                        <div className="table-row-header" >
                            <div className="table-cell w-[20px]">
                                #
                            </div>
                            <div className="table-cell w-[200px]">
                                Назва
                            </div>
                            <div className="table-cell">
                                Опис
                            </div>
                        </div >

                        {isCreateModalShown && <Modal onClose={() => { setIsCreateModalShown(false) }}>
                            <CreateExamForm />
                        </Modal>}

                        {examsList.map((exam, index) => {
                            return (
                                <div className="table-row">
                                    <Link to={`/start?examId=${exam.id}`}>
                                        <div className="flex ml-[8px]">
                                            <div className="table-cell w-[20px]">
                                                {index + 1}
                                            </div>
                                            <div className="table-cell w-[200px]">
                                                {exam.title}
                                            </div>
                                            <div className="table-cell no-overflow">
                                                {exam.description}
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="flex mr-[8px]">
                                        <div className="table-cell w-[24px]">
                                            <button onClick={() => {
                                                setExamsList(examsList.filter((e) => e !== exam));
                                            }}>
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                    </div>

                    <button className="button" onClick={() => { setIsCreateModalShown(true) }}>
                        Створити контрольну
                    </button>
                </div>
            </div>
        </>

    )
}