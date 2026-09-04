import './assessments.css';

/** Single MCQ with selectable options. Selection is held by the parent page. */
function QuestionCard({ question, index, total, selected, onSelect }) {
  return (
    <div className="question">
      <div className="row-between question__meta">
        <span className="tiny muted">
          Question {index + 1} of {total}
        </span>
        <div className="row">
          <span className="badge badge-brand">{question.skill}</span>
          <span className="badge badge-neutral">{question.difficulty}</span>
        </div>
      </div>

      <h2 className="question__text">{question.question}</h2>
      <p className="tiny muted">Topic: {question.topic}</p>

      <ul className="question__options">
        {question.options.map((option, optionIndex) => {
          const id = `${question.id}-${optionIndex}`;
          return (
            <li key={id}>
              <label className={`option ${selected === optionIndex ? 'is-selected' : ''}`} htmlFor={id}>
                <input
                  id={id}
                  type="radio"
                  name={question.id}
                  checked={selected === optionIndex}
                  onChange={() => onSelect(question.id, optionIndex)}
                />
                <span className="option__marker">{String.fromCharCode(65 + optionIndex)}</span>
                <span>{option}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuestionCard;
