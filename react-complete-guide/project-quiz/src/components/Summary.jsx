import quizCompleteImg from "../assets/quiz-complete.png";
import { isEmptyObject } from "../utils/jsUtils";

function getPercent({ value, total }) {
  return value > 0 ? (value / total) * 100 : 0;
}

export default function Summary({ questions, userAnswers }) {
  let correctAnswers = 0;
  let skippedAnswers = 0;

  userAnswers.forEach(({ answerStatus }) => {
    const isCorrect = answerStatus === "correct";
    const isSkipped = answerStatus === "skipped";

    if (isCorrect) correctAnswers++;
    else if (isSkipped) skippedAnswers++;
  });
  const wrongAnswers = userAnswers.length - (correctAnswers + skippedAnswers);

  const correctPercent = getPercent({ value: correctAnswers, total: questions.length });
  const skippedPercent = getPercent({ value: skippedAnswers, total: questions.length });
  const wrongPercent = getPercent({ value: wrongAnswers, total: questions.length });

  return (
    <div id="summary">
      <div>
        <img src={quizCompleteImg} alt="Image of the quiz being completed" />
        <h2>Quiz Completed!</h2>
        <div id="summary-stats">
          <p>
            <span className="number">{`${correctPercent.toFixed(0)}%`}</span>
            <span className="text">Correct</span>
          </p>
          <p>
            <span className="number">{`${wrongPercent.toFixed(0)}%`}</span>
            <span className="text">Wrong</span>
          </p>
          <p>
            <span className="number">{`${skippedPercent.toFixed(0)}%`}</span>
            <span className="text">Skipped</span>
          </p>
        </div>
      </div>
      <ol>
        {questions.map((question, index) => {
          const userAnswer = userAnswers.find((answer) => answer.questionId === question.id);
          const noAnswerFound = isEmptyObject(userAnswer);
          const isSkippedAnswer = !noAnswerFound && userAnswer.answerStatus === "skipped";
          let answerClassName = "user-answer";

          let answerText;
          if (noAnswerFound) answerText = "Not Answered";
          else if (isSkippedAnswer) {
            answerText = "Skipped";
            answerClassName += " skipped";
          } else {
            answerText = question.answers.find((answer) => answer.id === userAnswer.answerId).text;
            if (userAnswer.answerStatus === "correct") answerClassName += " correct";
            else answerClassName += " wrong";
          }

          return (
            <li key={question.id}>
              <h3>{index + 1}</h3>
              <p className="question">{question.text}</p>
              <p className={answerClassName}>{answerText}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
