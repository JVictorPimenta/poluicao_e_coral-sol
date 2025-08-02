import { Link } from 'react-router-dom';
import '../App.css';

export default function Home() {
  return (
    <div className="quiz-container">
      <h1>Bem-vindo!</h1>
      <p>Escolha uma opção:</p>
      <div className="options-grid">
        <Link to="/quiz">
          <button className="default">Fazer o Quiz</button>
        </Link>
        <Link to="/apoio">
          <button className="default">Ler Textos de Apoio</button>
        </Link>
      </div>
    </div>
  );
}
