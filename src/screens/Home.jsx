import { Link } from 'react-router-dom';
import '../App.css';

export default function Home() {
  return (
    <div className="quiz-container">
      <h1>Bem-vindo!</h1>
      <p>Escolha uma opção:</p>
      <div className="options-home">
        <Link to="/apoio">
          <button style={{minWidth:'200px'}} className="default">Ler textos de apoio</button>
        </Link>
        <Link to="/quiz">
          <button style={{minWidth:'200px'}} className="default">Fazer o quiz</button>
        </Link>
        <Link to="/simulador"> 
          <button style={{minWidth:'200px'}} className='default'>Ir para o simulador</button>
        </Link>
        <Link to="/toupeira"> 
          <button style={{minWidth:'200px'}} className='default'>Ir para o jogo da toupeira</button>
        </Link>
      </div>
    </div>
  );
}
