import { useCallback, useState } from "react";

import { LOTR_QUESTIONS } from "../questions";

import Question from "./Question";
import Summary from "./Summary";

export default function Quiz({ questions = LOTR_QUESTIONS }) {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const isQuizCompleted = userAnswers.length === questions.length;

  const onSelectedAnswer = useCallback(
    ({ selectedAnswerId, answerStatus }) => {
      setUserAnswers((prevAnswers) => {
        const currentQuestionId = questions[activeQuestionIndex].id;

        const isAlreadyAnswered = prevAnswers.some(
          (answer) => answer.questionId === currentQuestionId
        );

        if (isAlreadyAnswered) {
          return prevAnswers;
        } else {
          const newAnswer = {
            questionId: currentQuestionId,
            answerId: selectedAnswerId,
            answerStatus
          };
          const newAnswers = [...prevAnswers, newAnswer];

          return newAnswers;
        }
      });
    },
    [activeQuestionIndex, questions]
  );

  if (isQuizCompleted) {
    return <Summary questions={questions} userAnswers={userAnswers} />;
  } else {
    const question = { ...questions[activeQuestionIndex] };
    question.answers = [...question.answers].sort(() => Math.random() - 0.5);

    return (
      <div id="quiz">
        <Question timer={15000} question={question} onSelectedAnswer={onSelectedAnswer} />
      </div>
    );
  }
}
