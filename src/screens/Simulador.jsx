import { useState } from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const limites = {
  max: 100,
  min: 0,
  gameOver: 5,
};

const objetivoFinal = {
  turno: 20,
  coralMin: 50,
};

export default function Simulador() {
  const [eco, setEco] = useState({
    peixes: 50,
    algas: 40,
    tubaroes: 10,
    corais: 30,
    poluicao: 10,
    turno: 0,
    alerta: '',
    gameOver: false,
    vitorioso: false,
    historico: [],
  });

  const acoes = [
    {
      nome: 'Limpar Poluição',
      efeito: (eco) => ({ ...eco, poluicao: Math.max(eco.poluicao - 10, limites.min), algas: eco.algas - 2 }),
    },
    {
      nome: 'Soltar Peixes',
      efeito: (eco) => ({ ...eco, peixes: Math.min(eco.peixes + 15, limites.max), algas: eco.algas - 3 }),
    },
    {
      nome: 'Proteger Corais',
      efeito: (eco) => ({ ...eco, corais: Math.min(eco.corais + 10, limites.max), peixes: eco.peixes - 5 }),
    },
    {
      nome: 'Reduzir Pesca',
      efeito: (eco) => ({ ...eco, peixes: eco.peixes + 10, algas: eco.algas + 5, tubaroes: eco.tubaroes + 1 }),
    },
    {
      nome: 'Despejar Lixo (Sabotar)',
      efeito: (eco) => ({ ...eco, poluicao: Math.min(eco.poluicao + 20, limites.max), corais: Math.max(eco.corais - 5, limites.min), algas: eco.algas - 4 }),
    },
  ];

  function aplicarAcao(acao) {
    if (eco.gameOver || eco.vitorioso) return;

    let novo = { ...acao.efeito(eco) };

    // efeitos gerais por turno
    novo.algas = Math.min(Math.max(novo.algas + 3 - Math.floor(novo.peixes / 20), limites.min), limites.max);
    novo.peixes = Math.min(Math.max(novo.peixes + Math.floor(novo.algas / 10) - 2, limites.min), limites.max);
    novo.tubaroes = Math.min(Math.max(novo.tubaroes + Math.floor(novo.peixes / 50) - 1, limites.min), limites.max);
    novo.corais = Math.min(Math.max(novo.corais - Math.floor(novo.poluicao / 15), limites.min), limites.max);
    novo.poluicao = Math.min(novo.poluicao + 2, limites.max);

    novo.turno = eco.turno + 1;
    novo.historico = [...eco.historico, acao.nome];

    if (novo.peixes < limites.gameOver || novo.algas < limites.gameOver || novo.corais < limites.gameOver) {
      novo.alerta = '❌ O ecossistema colapsou! Fim de jogo.';
      novo.gameOver = true;
    } else if (novo.poluicao > 70) {
      novo.alerta = '⚠️ Poluição em nível crítico!';
    } else if (novo.turno >= objetivoFinal.turno && novo.corais >= objetivoFinal.coralMin) {
      novo.alerta = '🎉 Parabéns! Você restaurou o ecossistema marinho!';
      novo.vitorioso = true;
    } else {
      novo.alerta = '';
    }

    setEco(novo);
  }

  function reiniciar() {
    setEco({
      peixes: 50,
      algas: 40,
      tubaroes: 10,
      corais: 30,
      poluicao: 10,
      turno: 0,
      alerta: '',
      gameOver: false,
      vitorioso: false,
      historico: [],
    });
  }

  return (
    <div className="quiz-container">
      <h1>🌊 Simulador Estratégico Marinho</h1>
      <p><strong>Turno:</strong> {eco.turno}</p>
      <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
        <p>🐟 Peixes: {eco.peixes}</p>
        <p>🌿 Algas: {eco.algas}</p>
        <p>🦈 Tubarões: {eco.tubaroes}</p>
        <p>🪸 Corais: {eco.corais}</p>
        <p>🧪 Poluição: {eco.poluicao}</p>
      </div>
      {eco.alerta && <p className="timer">{eco.alerta}</p>}

      <div className="options-grid">
        {acoes.map((a, i) => (
          <Button key={i} onClick={() => aplicarAcao(a)} disabled={eco.gameOver || eco.vitorioso}>{a.nome}</Button>
        ))}
      </div>

      {(eco.gameOver || eco.vitorioso) && (
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={reiniciar}>🔁 Reiniciar Jogo</Button>
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <Link to="/">
          <button className="default">Voltar</button>
        </Link>
      </div>
    </div>
  );
}
