const Choice = ({ value, emoji, onClick, isRevealing, lastResult }) => {
  let status = 'default';

  if (isRevealing && lastResult) {
    if (lastResult.correctChoice === value) {
      status = 'correct';
    } else if (lastResult.userChoice === value) {
      status = 'incorrect';
    }
  }

  const getClassName = () => {
    let classes = 'choice-box';
    if (isRevealing) classes += ' disabled';
    if (status === 'correct') classes += ' is-correct';
    if (status === 'incorrect') classes += ' is-incorrect';
    if (isRevealing && lastResult && lastResult.userChoice === value) {
        classes += ' is-selected';
    }
    return classes;
  };

  return (
    <div className={getClassName()} onClick={() => onClick(value)}>
      {emoji}
    </div>
  );
};

export default Choice;
