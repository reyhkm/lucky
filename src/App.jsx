import { useState } from 'react';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const TOTAL_ROUNDS = 10;

function App() {
  const [gameState, setGameState] = useState('playing'); // 'playing', 'result'
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  const handleChoice = (userChoice) => {
    const correctChoice = Math.random() < 0.5 ? 'A' : 'B';
    const isCorrect = userChoice === correctChoice;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    const newHistory = [...history, { round, userChoice, correctChoice, isCorrect }];
    setHistory(newHistory);

    if (round < TOTAL_ROUNDS) {
      setRound(prevRound => prevRound + 1);
    } else {
      setGameState('result');
    }
  };

  const handleRestart = () => {
    setGameState('playing');
    setRound(1);
    setScore(0);
    setHistory([]);
  };

  return (
    <div className="main-container">
      <section className="section">
        <div className="container">
          <h1 className="title is-1 has-text-white">Uji Keberuntungan</h1>
          {
            gameState === 'playing' ? (
              <GameScreen 
                round={round}
                totalRounds={TOTAL_ROUNDS}
                score={score}
                onChoose={handleChoice}
                lastResult={history.length > 0 ? history[history.length - 1] : null}
              />
            ) : (
              <ResultScreen 
                score={score}
                totalRounds={TOTAL_ROUNDS}
                onRestart={handleRestart}
              />
            )
          }
        </div>
      </section>
      <div className="footer-text">
        Dibuat dengan React + Vite + Bulma
      </div>
    </div>
  );
}

export default App;
