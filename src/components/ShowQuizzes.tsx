"use client";

import { useState } from "react";

interface IParams {
  Quizzes: any;
  Filters: {
    selectedCourse: string;
    selectedModule: string;
    selectedChapter: string;
  };
  search: number;
  setSelectedRegister: any;
  removeQuiz: any;
}

export default function ShowQuizes({
  Quizzes,
  Filters,
  search,
  setSelectedRegister,
  removeQuiz,
}: IParams) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (index: any) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="grid grid-cols-2" style={{ gridAutoRows: "50px" }}>
      {Quizzes.map((quiz: any, index: number) => {
        const isExpanded = expandedIndex === index;
        if ( //filter quizzes with chapter if filter is set
          quiz.chapter_id != Filters.selectedChapter &&
          Filters.selectedChapter != "-1"
        )
          return;
        if ( //filter quizzes with module if filter is set
          quiz.module_id != Filters.selectedModule &&
          Filters.selectedModule != "-1"
        )
          return;
        if ( //filter quizzes with course if filter is set
          quiz.course_id != Filters.selectedCourse &&
          Filters.selectedCourse != "-1"
        )
          return;

        if (search != 0 && search != index + 1) return; //get quiz by number if filter is set
        return (
          <div
            key={index}
            className={`border-2 rounded-md h-10 duration-500 p-0 m-2 overflow-hidden bg-secondary z-0 hover:h-fit quizHovering`}
          >
            <div className="h-10 p-0 m-0 flex justify-between items-center px-5 bg-blue-950">
            <div>Quiz N°{index + 1}</div>
              <div>{quiz.group}</div>
              <div className="flex gap-2">

                <button

                  className="text-firstBlue font-bold opacity-20 hover:opacity-100 duration-100 quiz-modify"
                  onClick={() => setSelectedRegister(index)}
                >
                  Modifier
                </button>
                <button
                  className="text-red-500 font-bold opacity-20 hover:opacity-100 duration-100 quiz-remove"
                  onClick={() => removeQuiz(index)}
                >
                  Supprimer
                </button>
              </div>
            </div>
            <>
              <div
                className={` bg-secondary   p-2 m-0 flex items-center px-5 border-b-4 border-b-orange-50 quiz-question `}
              >
                {quiz.question}
              </div>
              <div className="max-h-40 overflow-y-scroll">
                {quiz.answers.map((answer: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={` bg-secondary   p-1 m-0 flex items-center px-5 border-t `}
                    >
                      {answer}
                    </div>
                  );
                })}
              </div>
              <div
                key={index}
                className={` bg-secondary   p-2 m-0 flex items-center px-5 border-t-4 border-t-orange-50`}
              >
                Correct : {quiz.correct_answer}
              </div>
            </>
          </div>
        );
      })}
    </div>
  );
}
