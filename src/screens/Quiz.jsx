import { useState, useEffect } from "react";
import "../App.css";

const questions = [
  {
    question: "O que é o coral-sol?",
    options: [
      "Uma espécie nativa do Brasil",
      "Um coral que ajuda na preservação",
      "Um coral invasor que prejudica ecossistemas",
      "Um tipo de peixe coralino"
    ],
    answer: 2
  },
  {
    question: "Qual é uma consequência da poluição marinha?",
    options: [
      "Aumento da biodiversidade",
      "Melhoria da pesca artesanal",
      "Morte de animais marinhos",
      "Formação de novos recifes"
    ],
    answer: 2
  },
  {
    question: "Qual ação ajuda a combater o coral-sol?",
    options: [
      "Deixá-lo crescer livremente",
      "Remoção manual controlada",
      "Introduzir mais espécies invasoras",
      "Poluir o ambiente para enfraquecê-lo"
    ],
    answer: 1
  },
  {
    question: "O que é microplástico?",
    options: [
      "Fragmento de vidro",
      "Resíduo industrial metálico",
      "Pequenos pedaços de plástico",
      "Areia contaminada"
    ],
    answer: 2
  },
  {
    question: "Por que o coral-sol é prejudicial?",
    options: [
      "Ele produz toxinas no ar",
      "Substitui espécies nativas e altera o ecossistema",
      "Atrai tubarões perigosos",
      "Impede a pesca esportiva"
    ],
    answer: 1
  },
  {
    question: "O que é uma ação sustentável para o oceano?",
    options: [
      "Jogar lixo no mar longe da costa",
      "Usar canudos plásticos biodegradáveis",
      "Consumir peixes ameaçados",
      "Alimentar animais marinhos com restos"
    ],
    answer: 1
  },
  {
    question: "Qual é um impacto da poluição sonora no mar?",
    options: [
      "Melhora a comunicação entre espécies",
      "Afasta predadores",
      "Desorienta animais como baleias e golfinhos",
      "Ajuda os animais a caçarem mais facilmente"
    ],
    answer: 2
  },
  {
    question: "Que atitude ajuda a preservar os oceanos?",
    options: [
      "Comprar produtos de pesca ilegal",
      "Participar de mutirões de limpeza",
      "Descartar óleo na pia",
      "Caçar animais em extinção"
    ],
    answer: 1
  },
  {
    question: "O coral-sol chegou ao Brasil provavelmente por:",
    options: [
      "Migração natural",
      "Navios e plataformas de petróleo",
      "Mudança climática",
      "Exploração submarina de cavernas"
    ],
    answer: 1
  },
  {
    question: "A poluição marinha afeta diretamente:",
    options: [
      "A fertilidade do solo",
      "As florestas tropicais",
      "A vida marinha e os seres humanos",
      "A camada de ozônio"
    ],
    answer: 2
  },
  {
    question: "Qual destas opções é uma ameaça direta aos recifes de coral?",
    options: [
      "Pesca sustentável",
      "Turismo controlado",
      "Despejo de esgoto no mar",
      "Fotografias subaquáticas"
    ],
    answer: 2
  },
  {
    question: "Qual destes elementos afeta menos o ecossistema marinho?",
    options: [
      "Plástico descartado",
      "Barulho de motores",
      "Poluição do solo",
      "Derramamento de óleo"
    ],
    answer: 2
  },
  {
    question: "Corais são considerados animais, plantas ou minerais?",
    options: [
      "Plantas",
      "Minerais",
      "Animais",
      "Fungos"
    ],
    answer: 2
  },
  {
    question: "Qual alternativa está incorreta sobre o coral-sol?",
    options: [
      "Pode se reproduzir rapidamente",
      "É uma espécie exótica invasora",
      "Ajuda a equilibrar o ecossistema local",
      "É encontrado em áreas portuárias"
    ],
    answer: 2
  },
  {
    question: "Qual das opções é uma prática prejudicial ao oceano?",
    options: [
      "Evitar produtos descartáveis",
      "Reduzir o consumo de peixe",
      "Alimentar peixes com restos de comida",
      "Participar de limpeza de praias"
    ],
    answer: 2
  },
  {
    question: "O que mais contribui para a formação da 'ilha de lixo' no oceano Pacífico?",
    options: [
      "Navios de cruzeiro",
      "Vazamentos de petróleo",
      "Correntes oceânicas acumulando plásticos",
      "Atividade vulcânica subaquática"
    ],
    answer: 2
  },
  {
    question: "Qual dos seguintes animais sofre com ingestão de plástico no mar?",
    options: [
      "Tartarugas marinhas",
      "Elefantes",
      "Leões",
      "Macacos"
    ],
    answer: 0
  },
  {
    question: "A cor vibrante de um coral saudável indica:",
    options: [
      "Estresse térmico",
      "Saúde e simbiose com algas",
      "Doença coralina",
      "Presença de poluição"
    ],
    answer: 1
  },
  {
    question: "Qual das opções é mais eficiente para diminuir o impacto ambiental no oceano?",
    options: [
      "Usar sacolas de papel",
      "Utilizar transporte marítimo para tudo",
      "Evitar o consumo de plásticos descartáveis",
      "Consumir mais peixe de aquários"
    ],
    answer: 2
  },
  {
    question: "Qual é a principal característica do coral-sol que o torna uma ameaça?",
    options: [
      "É muito bonito e colorido",
      "Cresce lentamente, cobrindo o fundo do mar",
      "Tem crescimento acelerado e cobre outras espécies",
      "Serve de abrigo para outras espécies"
    ],
    answer: 2
  }
];

export default function QuizGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(20);
    setSelected(null);
  }, [current]);

  function handleAnswer(index) {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[current].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      const next = current + 1;
      if (next < questions.length) {
        setCurrent(next);
      } else {
        setShowResult(true);
      }
    }, 1000);
  }

  if (showResult) {
    return (
      <div className="quiz-container result">
        <h1>Fim do Quiz!</h1>
        <p>Você acertou {score} de {questions.length} perguntas.</p>
        <button className="default" onClick={() => {
          setCurrent(0);
          setScore(0);
          setShowResult(false);
          setTimeLeft(20);
        }}>Tentar novamente</button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-container">
      <h2>Pergunta {current + 1}</h2>
      <div className="timer">Tempo: {timeLeft}s</div>
      <p>{q.question}</p>
      <div className="options-grid">
        {q.options.map((opt, i) => {
          let className = "default";
          if (selected !== null) {
            if (i === q.answer) className = "correct";
            else if (i === selected) className = "wrong";
            else className = "disabled";
          }
          return (
            <button
              key={i}
              className={className}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
