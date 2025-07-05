const ResultScreen = ({ score, totalRounds, onRestart }) => {
  const getMessage = () => {
    const percentage = (score / totalRounds) * 100;
    if (percentage >= 80) return "Wow, keberuntunganmu luar biasa!";
    if (percentage >= 60) return "Cukup beruntung!";
    if (percentage >= 40) return "Lumayan, coba lagi untuk lebih baik.";
    return "Sepertinya hari ini bukan hari keberuntunganmu.";
  };

  return (
    <div className="has-text-centered">
      <h2 className="title is-2 has-text-white">Permainan Selesai!</h2>
      <p className="subtitle is-4 has-text-grey-light">Skor Akhir Anda:</p>
      <p className="title is-1 has-text-warning" style={{ margin: '2rem 0' }}>
        {score} / {totalRounds}
      </p>
      <p className="subtitle is-5 has-text-info-light">{getMessage()}</p>
      <button 
        className="button is-primary is-large is-rounded mt-5"
        onClick={onRestart}
      >
        Coba Lagi
      </button>
    </div>
  );
};

export default ResultScreen;
