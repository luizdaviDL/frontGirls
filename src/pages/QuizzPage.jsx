import React, { useState, useEffect } from 'react';
import { Button } from '../buttons/Button';
import { useNavigate, useLocation } from 'react-router-dom';


const questions = [
  {
    question: "Quando a gente fala em queimadura, o que isso quer dizer?",
    options: [
      "É quando a gente se arranha com uma planta",
      "É quando a gente escorrega no chão",
      "É quando a pele fica machucada por algo quente ou gelado demais",
      "É quando a gente sente frio e espirra"
    ],
    correctAnswerIndex: 2
  },
  {
    question: "Alguém se queimou! O que não é uma boa ideia fazer?",
    options: [
      "Passar pasta de dente no machucado",
      "Colocar a mão queimada na água fria da torneira",
      "Ir pro médico se for grave.",
      "Pedir ajuda pra um adulto"
    ],
    correctAnswerIndex: 0
  },
  {
    question: "O que a gente pode fazer pra não se queimar em casa?",
    options: [
      "Ficar longe de coisas quentes como o fogão",
      "Botar o dedo perto do fogo pra brincar",
      "Acender velas sozinho",
      "Ficar mexendo nas panelas no fogão."
    ],
    correctAnswerIndex: 0
  },
  {
    question: "Qual dessas coisas pode queimar você de verdade?",
    options: [
      "Tomar água gelada",
      "Pegar uma panela quente",      
      "Comer frutas no almoço",
      "Brincar no quintal"
    ],
    correctAnswerIndex: 1
  },
  {
    question: "Você queimou a mão. O que deve fazer logo em seguida?",
    options: [      
      "Passar qualquer coisa da cozinha",
      "Esconder o machucado da mamãe",
      "Esfregar um pano no lugar",
      "Colocar a mão queimada em água corrente por alguns minutos"
    ],
    correctAnswerIndex: 3
  },
  {
    question: "O que pode causar queimadura se não tomar cuidado?",
    options: [      
      "Janela, escada e tapete",
      "Cadeira, sofá e guarda-roupa",
      "Fogão, ferro quente e forno ligado",
      "Brinquedos, livros e travesseiros."
    ],
    correctAnswerIndex: 2
  },
  {
    question: "Você viu uma bolha no machucado de queimadura. Pode estourar?",
    options: [
      "Sim, porque vai sair a dor",
      "Claro, assim sara mais rápido",
      "Não! Pode piorar e pegar bichinhos",
      "Sim, porque é divertido"
    ],
    correctAnswerIndex: 2
  },
  {
    question: "Se tem fumaça no quarto, o que você faz pra se proteger?",
    options: [      
      "Se esconde atrás da porta",
      "Se abaixa e tenta sair com cuidado",
      "Corre sem parar dentro do quarto",
      "Sobe na cama pra gritar"
    ],
    correctAnswerIndex: 1
  },
  {
    question: "Se sua roupa pegar fogo, qual é o certo a fazer?",
    options: [
      "Soprar o fogo até apagar",
      "Tirar a roupa bem rápido",
      "Correr pra alguém ver",
      "Ficar parado e rolar no chão até apagar o fogo"
    ],
    correctAnswerIndex: 3
  }
];

export const QuizzPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const savedIndex = Number(sessionStorage.getItem('currentIndex')) || 0;
  const [currentIndex, setCurrentIndex] = useState(savedIndex);
  const currentQuestion = questions[currentIndex];
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  // Responsividade: detecta largura da tela
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
{/**  useEffect(() => {
  if (currentIndex === 3) {
    const timer = setTimeout(() => {
      setCurrentIndex(4);
      setSelectedOption(null);
      setShowAnswer(false);
    }, 3000); // 3000ms = 3 segundos

    return () => clearTimeout(timer); // limpar o timeout se o componente for desmontado
  }
}, [currentIndex]); */}



  useEffect(() => {
    const savedScore = sessionStorage.getItem('score');
    if (savedScore !== null) {
      setScore(Number(savedScore));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('score', score);
  }, [score]);

  const handleOptionClick = (idx) => {
    if (!showAnswer) {
      setSelectedOption(idx);
    }
  };

  const handleNext = () => {
    if (selectedOption === null) {
      alert("Por favor, escolha uma opção antes de continuar.");
      return;
    }

    if (!showAnswer) {
      const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
      setAnswers(prev => [...prev, { questionIndex: currentIndex, selectedOption, isCorrect }]);
      if (isCorrect) {
        const newScore = score + 1;
        setScore(newScore);
        sessionStorage.setItem('score', newScore);
      }
      setShowAnswer(true);
    } else {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        setLoading(true); 
        fetch('https://girlsbackend.onrender.com/api/score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answers),
        })
        .then(res => res.json())
        .then(data => {          
          console.log('Resposta da API:', data);
          setLoading(false);
          navigate('/score', { state: { scoreValue: score, dataV: data } });
         // sessionStorage.setItem('dataV', JSON.stringify(data));

          sessionStorage.removeItem('score');
        })
        .catch(error => console.error('Erro ao enviar:', error))
        .finally(() => setLoading(false));
      }
    }
 
  };

  return (
    <div style={{ padding: '1rem', overflow:"none"}}>
      {/**      {currentIndex === 3 ? (
        <div className="container" style={{ width: "25rem", height: "15rem" }}>
          <section style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginTop: "3rem" }}>
              <img
                src="../src/assets/characters/feedbackCharacter.png"
                style={{ width: "10rem", height: "10rem" }}
                alt="Personagem"
              />
            </div>
            <div style={{ width: "15rem" }}>
              <h4
                style={{
                  color: "#333",
                  width: "fit-content",
                  maxWidth: "90%",
                  textAlign: "center",
                  padding: "1.2rem 2rem",
                  background: "linear-gradient(135deg, #fff, #f2f2f2)",
                  boxShadow: "0 0 10px #434343",
                  borderRadius: "1.5rem",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  margin: "2rem auto",
                  animation: "fadeIn 0.8s ease-in-out"
                }}
              >
                Vamos lá, você está indo bem!
              </h4>
            </div>
          </section>
        </div>
      ) : ( */}
        <>

          {loading && ( 
            <>
              <style>
                {`
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }

                  @keyframes pulse {
                    0%   { transform: scale(1); }
                    50%  { transform: scale(1.1); }
                    100% { transform: scale(1); }
                  }

                  .fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                  }

                  .pulseText {
                    display: inline-block;
                    animation: pulse 1.2s ease-in-out infinite;
                  }
                `}
              </style>

              <div
                className="fadeIn"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.5rem",
                  zIndex: 9999
                }}
              >
                <div
                  style={{
                    background: "#222",
                    padding: "2rem",
                    borderRadius: "1rem",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                    textAlign: "center"
                  }}
                >
                  <h3 className="pulseText">Aguarde...</h3> <br />
                  <p className="pulseText">Calculando sua pontuação</p>
                </div>
              </div>
            </>
          )} 


          <div
            className="container"
            style={{
             // boxShadow: "0 0 20px rgb(167, 167, 167)",
              //backgroundColor: "#1f41b3ff",
              height: "auto",
              borderRadius: "1rem",
              flexWrap:"wrap",        
              minWidth:"10rem",    
              marginTop: isMobile ?"0" : "-5rem"
            }}
          >
            <div style={{ 
              display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "center" : "flex-start",
                justifyContent: "center",
                marginBottom: "1rem",
                marginTop: "4rem",
                gap: "1rem",                
              }}>
              <div className="character" style={{marginTop:"2rem"}}>
                <img
                  src="./choicCharacter.png"
                  style={{ width: "8rem", height: "8rem" }}
                  alt="Personagem"
                />
              </div>
              <div
                className="textArea"
                style={{
                  minWidth: "17rem",                  
                  maxWidth:"25rem",
                  backgroundColor: "#FFFAFA",
                  boxShadow: "0 0 10px rgb(167, 167, 167)",
                  borderRadius: "1rem",
                  marginLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                  marginTop:"2rem"
                }}
              >
                <p style={{fontSize:"1.2rem"}}>{currentQuestion.question}</p>
              </div>
            </div>

            <section
              style={{
                display: "flex",
                
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                maxWidth: "600px", // limite para desktop
                margin: "0 auto", // centraliza
                padding: "0.5rem",
                
              }}
            >
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQuestion.correctAnswerIndex === idx;
                const showCorrect = showAnswer && isCorrect;
                const showWrong = showAnswer && isSelected && !isCorrect;

                let backgroundColor = "#FFFFFF";
                let color = "#3A3A3A";
                let cursor = "pointer";

                if (showCorrect) {
                  backgroundColor = "#A1D3AD";
                  color = "#155724";
                  cursor = "default";
                } else if (showWrong) {
                  backgroundColor = "#FBC1C7";
                  color = "#721c24";
                  cursor = "default";
                } else if (isSelected) {
                  backgroundColor = "#91CFDD";
                  color = "#001F22";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={showAnswer}
                    style={{
                      backgroundColor,
                      color:"#423f3fff",
                      border: "2px solid rgba(0, 0, 0, 0.4)",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 1rem",
                      cursor,
                      fontWeight: "bold",
                      width: "100%",
                      height:"auto",
                      textAlign: "left",
                      transition: "background-color 0.3s, color 0.3s",
                      //fontSize:"1.18rem",
                      fontSize:"1.35rem"
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </section>
          </div>
          {selectedOption !== null && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <Button
                onClick={handleNext}
                text={showAnswer ? "Próxima" : "Confirmar"}
              />
            </div>
          )}

        </>
      
    </div>
  );
};
