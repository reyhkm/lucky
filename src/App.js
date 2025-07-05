import React, { useState, useEffect } from 'react';

const TOTAL_ROUNDS = 10;

function App() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [correctChoice, setCorrectChoice] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const choices = ['💎', '🪙'];

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        if (round < TOTAL_ROUNDS) {
          setRound(prevRound => prevRound + 1);
          setIsRevealed(false);
          setUserChoice(null);
          setCorrectChoice(null);
        } else {
          setIsGameOver(true);
        }
      }, 2000); // Wait 2 seconds before next round

      return () => clearTimeout(timer);
    }
  }, [isRevealed, round]);

  const handleChoice = (choiceIndex) => {
    if (isRevealed || isGameOver) return;

    const newCorrectChoice = Math.floor(Math.random() * 2);
    setUserChoice(choiceIndex);
    setCorrectChoice(newCorrectChoice);

    if (choiceIndex === newCorrectChoice) {
      setScore(prevScore => prevScore + 1);
    }

    setIsRevealed(true);
  };

  const handlePlayAgain = () => {
    setRound(1);
    setScore(0);
    setUserChoice(null);
    setCorrectChoice(null);
    setIsRevealed(false);
    setIsGameOver(false);
  };

  const getBoxClass = (index) => {
    if (!isRevealed) {
      return '';
    }
    let classes = 'is-disabled ';
    if (index === correctChoice) {
      classes += 'correct ';
    } else {
      classes += 'wrong ';
    }
    if (index === userChoice) {
      classes += 'selected';
    }
    return classes;
  };

  const getFinalMessage = () => {
    const percentage = (score / TOTAL_ROUNDS) * 100;
    if (percentage >= 80) return 'Anda sangat beruntung! 🥳';
    if (percentage >= 50) return 'Lumayan juga keberuntunganmu. 🤔';
    return 'Mungkin lain kali lebih beruntung. 😅';
  };

  return (
    <section className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container">
        <div className="has-text-centered mb-6">
          <h1 className="title is-1 has-text-light">Uji Keberuntungan</h1>
          {!isGameOver && (
            <h2 className="subtitle is-3 has-text-grey-light">
              Ronde: {round} / {TOTAL_ROUNDS} | Skor: {score}
            </h2>
          )}
        </div>

        {isGameOver ? (
          <div className="has-text-centered final-score">
            <h2 className="title is-2 has-text-light">Permainan Selesai!</h2>
            <p className="title is-3 has-text-info">
              Skor Akhir Anda: {score} dari {TOTAL_ROUNDS}
            </p>
            <p className="subtitle is-5 has-text-grey-light mt-4">
              {getFinalMessage()}
            </p>
            <button className="button is-large is-primary is-light mt-5" onClick={handlePlayAgain}>
              Coba Lagi
            </button>
          </div>
        ) : (
          <div>
            <div className="columns is-mobile is-centered">
              {choices.map((choice, index) => (
                <div className="column is-5-mobile is-4-tablet is-3-desktop" key={index}>
                  <div
                    className={`box has-background-grey-darker has-text-light choice-box ${getBoxClass(index)}`}
                    onClick={() => handleChoice(index)}
                  >
                    <span style={{ fontSize: '5rem' }}>{choice}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="has-text-centered mt-5" style={{ minHeight: '50px' }}>
              {isRevealed ? (
                <p className="subtitle is-4 has-text-warning">
                  {userChoice === correctChoice ? 'Tebakan Anda Benar!' : 'Tebakan Anda Salah!'}
                </p>
              ) : (
                <p className="subtitle is-4 has-text-grey">Pilih salah satu...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
