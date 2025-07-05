import { useState, useEffect } from 'react';
import Choice from './Choice';

const GameScreen = ({ round, totalRounds, score, onChoose, lastResult }) => {
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    if (lastResult) {
      setIsRevealing(true);
      const timer = setTimeout(() => {
        setIsRevealing(false);
      }, 1500); // Duration to show the result
      return () => clearTimeout(timer);
    }
  }, [lastResult]);

  const handleChoiceClick = (choice) => {
    if (!isRevealing) {
      onChoose(choice);
    }
  };

  return (
    <div>
      <div className="level is-mobile">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Ronde</p>
            <p className="title is-3 has-text-white">{round}/{totalRounds}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Skor</p>
            <p className="title is-3 has-text-white">{score}</p>
          </div>
        </div>
      </div>

      <div className="result-message mt-4">
        {isRevealing && lastResult && (
          <h2 className={`title is-4 ${lastResult.isCorrect ? 'has-text-success' : 'has-text-danger'}`}>
            {lastResult.isCorrect ? 'Anda Benar!' : 'Anda Salah!'}
          </h2>
        )}
        {!isRevealing && (
            <h2 className="subtitle is-4 has-text-grey-light">Pilih salah satu...</h2>
        )}
      </div>

      <div className="choices-container">
        <Choice 
          value="A" 
          emoji="💎"
          onClick={handleChoiceClick}
          isRevealing={isRevealing}
          lastResult={lastResult}
        />
        <Choice 
          value="B" 
          emoji="🪙"
          onClick={handleChoiceClick}
          isRevealing={isRevealing}
          lastResult={lastResult}
        />
      </div>
    </div>
  );
};

export default GameScreen;
