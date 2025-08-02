import { Link } from 'react-router-dom';
import '../App.css';

export default function Apoio() {
  return (
    <div className="quiz-container">
      <h1>Textos de Apoio</h1>

      <section>
        <h2>Poluição Marinha</h2>
        <p>
          A poluição nos oceanos é causada principalmente por plásticos, esgoto, óleo e ruído. Ela afeta diretamente a vida marinha:
          tartarugas podem ingerir sacolas plásticas achando que são alimentos, baleias e golfinhos se desorientam com o barulho
          submarino, e os microplásticos entram na cadeia alimentar.
        </p>
        <p>
          Esse tipo de poluição também impacta os seres humanos, pois interfere na pesca, no turismo e na saúde dos oceanos. Evitar
          produtos descartáveis, participar de limpezas de praia e informar outras pessoas são atitudes essenciais.
        </p>
      </section>

      <section>
        <h2>O Coral-sol</h2>
        <p>
          O coral-sol é uma espécie invasora que chegou ao Brasil por meio de navios e plataformas. Ele cresce rapidamente, cobrindo
          outros organismos e afetando todo o ecossistema dos recifes. Por isso, é considerado uma grande ameaça ambiental.
        </p>
        <p>
          Como não possui predadores naturais aqui, sua remoção manual por especialistas é uma das poucas formas de controle. Conscientizar
          as pessoas sobre seus impactos é um passo importante para ajudar a preservar nossos mares.
        </p>
      </section>

      <Link to="/">
        <button className="default">Voltar</button>
      </Link>
    </div>
  );
}
