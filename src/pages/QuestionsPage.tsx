/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import EditIcon from "../assets/icons/EditIcon.tsx";
import DeleteIcon from "../assets/icons/DeleteIcon.tsx";
import CreateQuestionForm from "../components/CreateQuestionForm.tsx";
import { Question, QuestionType } from "../types.tsx";
import { deleteQuestion, getQuestions } from "../services/ExamService.tsx";
import SidebarNav from "../components/SidebarNav.tsx";
import { useNavigate } from "react-router-dom";

export default () => {
  const [isQuestionsModalShown, setIsQuestionModalShown] = useState(false);
  const [isImportModalShown, setIsImportModalShown] = useState(false);

  const [importedFile, setImportedFile] = useState<File | null>(null);

  const [questionsList, setQuestionsList] = useState<Question[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const examId = localStorage.getItem("examId");
    getQuestions(examId ?? "")
      .then((questions: Question[]) => {
        setQuestionsList(questions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        if (error.code === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, []);

  return (
    <>
      <SidebarNav />
      <div className="page-container">
        <div>
          <h1 className="page-title">Питання</h1>
          {isQuestionsModalShown && (
            <Modal
              onClose={() => {
                setIsQuestionModalShown(false);
              }}
            >
              <CreateQuestionForm
                onSubmit={(newQuestion) => {
                  console.log(newQuestion);
                  setQuestionsList(() => {
                    return [...questionsList, newQuestion];
                  });
                  setIsQuestionModalShown(false);
                }}
              />
            </Modal>
          )}

          {isImportModalShown && (
            <Modal
              onClose={() => {
                setIsImportModalShown(false);
              }}
            >
              <div className="import-modal">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImportedFile(file);
                    }
                  }}
                />
                {importedFile && (
                  <button
                    className="button"
                    onClick={() => {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const text = event.target?.result as string;
                        try {
                          const rows = text
                            .split("\n")
                            .map((row) => row.split(","));
                          console.log(rows);
                          const parsedQuestions = rows.map(
                            ([quesId, questionType, points, questionText]) => ({
                              quesId: Number(quesId),
                              questionType: questionType.trim() as QuestionType,
                              points: parseInt(points.trim(), 10),
                              questionText: questionText.trim(),
                            })
                          );
                          console.log(parsedQuestions);

                          const isValid = parsedQuestions.every(
                            (q) =>
                              (q.questionType === "TEXT" ||
                                q.questionType === "MULTIPLE_CHOICE" ||
                                q.questionType === "SINGLE_CHOICE") &&
                              !isNaN(q.points) &&
                              q.questionText
                          );

                          if (isValid) {
                            setQuestionsList(parsedQuestions);
                            setIsImportModalShown(false);
                            setIsImportModalShown(false);
                            setImportedFile(null);
                          } else {
                            alert("Невірний формат CSV файлу.");
                          }
                        } catch (error) {
                          console.error("Error parsing CSV file:", error);
                          alert("Помилка при обробці файлу.");
                        }
                      };
                      reader.readAsText(importedFile);
                    }}
                  >
                    Застосувати
                  </button>
                )}
              </div>
            </Modal>
          )}

          <div className="buttons-container">
            <button
              className="button"
              onClick={() => {
                setIsImportModalShown(true);
              }}
            >
              Імпортувати питання
            </button>
            <button
              className="button"
              onClick={() => {
                const element = document.createElement("a");
                const csvContent = questionsList
                  .map((q) => `${q.questionType},${q.points},${q.questionText}`)
                  .join("\n");
                const file = new Blob([csvContent], { type: "text/csv" });
                element.href = URL.createObjectURL(file);
                element.download = "Питання";
                document.body.appendChild(element);
                element.click();
              }}
            >
              Експортувати питання
            </button>
          </div>

          <div className="table">
            <div className="table-row-header">
              <div className="table-cell w-[20px]">#</div>
              <div className="table-cell w-[200px]">Вид питання</div>
              <div className="table-cell">Питання</div>
            </div>
            {questionsList.map((question, index) => {
              return (
                <div className="table-row">
                  <div className="flex ml-[8px]">
                    <div className="table-cell w-[20px]">{index + 1}</div>
                    <div className="table-cell w-[200px]">
                      {(() => {
                        switch (question.questionType) {
                          case "MULTIPLE_CHOICE":
                            return "Вибір з декількох варіантів";
                          case "SINGLE_CHOICE":
                            return "Вибір з одного варіанта";
                          case "TEXT":
                            return "Відкрите питання";
                          default:
                            return "";
                        }
                      })()}
                    </div>
                    <div className="table-cell">{question.questionText}</div>
                  </div>
                  <div className="flex mr-[8px]">
                    <div className="table-cell w-[24px]">
                      <button>
                        <EditIcon />
                      </button>
                    </div>
                    <div className="table-cell w-[24px]">
                      <button
                        onClick={async () => {
                          try {
                            await deleteQuestion(question.quesId);
                            setQuestionsList(
                              questionsList.filter((q) => q.quesId !== question.quesId)
                            );
                          } catch (error) {
                            console.error(
                              "Помилка при видаленні питання:",
                              error
                            );
                            alert("Не вдалося видалити питання.");
                          }
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="button"
            onClick={() => {
              setIsQuestionModalShown(true);
            }}
          >
            Створити питання
          </button>
        </div>
      </div>
    </>
  );
};
