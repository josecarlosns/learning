import { useCallback, useState } from "react";

import QuestionTimer from "./QuestionTimer";

export default function Question({ question, timer = 10000, onSelectedAnswer = () => {} }) {
  const [answerState, setAnswerState] = useState("");
  const [selectedAnswerId, setSelectedAnswerId] = useState("");
  const [isTimerActive, setTimerActive] = useState(true);

  const handleSelectAnswer = useCallback(
    ({ selectedAnswerId }) => {
      setAnswerState("answered");
      setTimerActive(false);
      setSelectedAnswerId(selectedAnswerId);

      let checkQuestionTimeout, nextQuestionTimeout;
      checkQuestionTimeout = setTimeout(() => {
        const isCorrectAnswer = selectedAnswerId === question.correctAnswerId;

        if (isCorrectAnswer) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        nextQuestionTimeout = setTimeout(() => {
          setAnswerState("");
          setTimerActive(true);
          onSelectedAnswer({
            selectedAnswerId,
            answerStatus: isCorrectAnswer ? "correct" : "wrong"
          });
        }, 2000);
      }, 1000);

      return () => {
        if (checkQuestionTimeout) clearTimeout(checkQuestionTimeout);
        if (nextQuestionTimeout) clearTimeout(nextQuestionTimeout);
      };
    },
    [question, onSelectedAnswer]
  );

  const onTimerExpired = useCallback(() => {
    onSelectedAnswer({ selectedAnswerId: "", answerStatus: "skipped" });
  }, [onSelectedAnswer]);

  return (
    <div id="question">
      <QuestionTimer
        key={question.id}
        decreasing
        maxValue={timer}
        onExpire={onTimerExpired}
        active={isTimerActive}
      />
      <h2>{question.text}</h2>
      <ul id="answers">
        {question.answers.map((answer) => {
          const isSelectedAnswer = selectedAnswerId === answer.id;
          let answerClassName = "";

          if (isSelectedAnswer) {
            switch (answerState) {
              case "answered": {
                answerClassName = "selected";
                break;
              }
              case "correct":
              case "wrong": {
                answerClassName = answerState;
                break;
              }
            }
          }

          return (
            <li key={answer.id} className="answer">
              <button
                className={answerClassName}
                onClick={() => handleSelectAnswer({ selectedAnswerId: answer.id })}
                disabled={answerState !== ""}
              >
                {answer.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
