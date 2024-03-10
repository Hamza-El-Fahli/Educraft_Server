"use client";

import Modal from "@/components/userModal";
import { useState } from "react";

export default function QuizForm() {
  const [isOpen, setisOpen] = useState(true);
  const [quizForm, setquizForm] = useState({
    seletedCourse: "1",
    selectedModule: "1",
    selectedChapter: "1",
    quizNumber: "1",
    correctAnswer: "",
    answers: [""],
  });
  function AddAnswer() {
    setquizForm({ ...quizForm, answers: [...quizForm.answers, ""] });
  }
  function RemoveAnswer() {
    if (quizForm.answers.length > 1)
      setquizForm({
        ...quizForm,
        answers: quizForm.answers.slice(0, quizForm.answers.length - 1),
      });
  }
  function setanswers(index: number, value: string) {
    const newAnswers = [...quizForm.answers];
    newAnswers[index] = value;

    setquizForm({ ...quizForm, answers: newAnswers });
  }

  

  function closeModal() {
    setisOpen(false);
  }
  return (
    <Modal isOpen={true} onClose={closeModal}>
      <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
      <p className="mb-4 text-blue-400">Fill the form</p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-3 w-80 "
      >
        <select
          name="course"
          id=""
          className="text-primary h-12 border p-3"
          value={quizForm.seletedCourse}
          onChange={(e) =>
            setquizForm({ ...quizForm, seletedCourse: e.target.value })
          }
        >
          <option value="1">CCNA1</option>
          <option value="2">CCNA2</option>
          <option value="3">CCNA3</option>
          <option value="4">CCNA4</option>
        </select>
        <select
          name="module"
          id=""
          className="text-primary h-12 border p-3"
          value={quizForm.selectedModule}
          onChange={(e) =>
            setquizForm({ ...quizForm, selectedModule: e.target.value })
          }
        >
          <option value="1">Module1</option>
          <option value="2">Module2</option>
          <option value="3">Module3</option>
          <option value="4">Module4</option>
        </select>

        <select
          name="chapter"
          id=""
          className="text-primary h-12 border p-3"
          value={quizForm.selectedChapter}
          onChange={(e) =>
            setquizForm({ ...quizForm, selectedChapter: e.target.value })
          }
        >
          <option value="1">Chapter1</option>
          <option value="2">Chapter2</option>
          <option value="3">Chapter3</option>
          <option value="4">Chapter4</option>
        </select>

        <input
          type="text"
          className="text-primary h-12 border p-3"
          value={quizForm.quizNumber}
          onChange={(e) =>
            setquizForm({ ...quizForm, quizNumber: e.target.value })
          }
        />
        <input
          type="text"
          className="text-primary h-12 border p-3"
          value={quizForm.correctAnswer}
          onChange={(e) =>
            setquizForm({ ...quizForm, correctAnswer: e.target.value })
          }
        />
        <div className="flex justify-between">
          <button className="text-2xl font-bold " onClick={() => AddAnswer()}>
            +
          </button>
          <button
            className="text-2xl font-bold "
            onClick={() => RemoveAnswer()}
          >
            -
          </button>
        </div>
        <div className="w-full h-36 overflow-y-scroll hideScroll">
          {quizForm.answers.map((answer, index) => (
            <input
              type="text"
              className="text-primary w-full border p-3"
              value={answer}
              onChange={(e) => setanswers(index, e.target.value)}
            />
          ))}
        </div>
      </form>
    </Modal>
  );
}
