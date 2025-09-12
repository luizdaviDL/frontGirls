import React, { useState, useEffect } from 'react';
import { Button } from '../buttons/Button';
import { useNavigate, useLocation } from 'react-router-dom';


const questions = [
  {
    question: "O que é uma queimadura?",
    options: [
      "Um machucado causado por algo quente ou muito frio, como o fogo ou o gelo.",
      "Um machucado feito por um espinho.",
      "Um machucado que aparece quando a gente corre muito.",
      "Uma doença que dá quando está muito frio."
    ],
    correctAnswerIndex: 0
  },
  {
    question: "O que não fazer quando alguém se queima?",
    options: [
      "Passar manteiga ou pasta de dente.",
      "Colocar a parte queimada em água corrente em temperatura ambiente.",
      "Pedir ajuda a um adulto.",
      "Levar a pessoa ao atendimento de saúde."
    ],
    correctAnswerIndex: 0
  },
  {
    question: "Como prevenir (evitar) queimaduras em casa?",
    options: [
      "Ficar longe do fogão e objetos quentes.",
      "Brincar com fósforos e velas.",
      "Colocar a mão dentro do forno.",
      "Encostar na panela quente para ver se está ligada."
    ],
    correctAnswerIndex: 0
  },
  {
    question: "Você sabe o que pode causar uma queimadura?",
    options: [
      "Comer frutas e legumes.",
      "Fogo, água quente ou o ferro de passar roupa.",      
      "Tomar banho de chuva.",
      "Dormir cedo."
    ],
    correctAnswerIndex: 1
  },
  {
    question: "O que fazer imediatamente após uma queimadura?",
    options: [      
      "Esfregar com uma toalha.",
      "Passar manteiga ou pasta de dente.",
      "Colocar a parte queimada em água corrente durante 5 a 10 minutos.",
      "Esconder o machucado e não contar para ninguém."
    ],
    correctAnswerIndex: 2
  },
  {
    question: "Quais os objetos em casa podem causar queimaduras?",
    options: [      
      "Sofá, travesseiro e cobertor.",
      "Fogão, ferro de passar e panela quente.",
      "Tapete, cortina e cadeira.",
      "Cama, mesa e televisão desligada."
    ],
    correctAnswerIndex: 1
  },
  {
    question: "Porque não devo estourar as bolhas da queimadura em casa?",
    options: [
      "Porque pode causar infecção e piorar o machucado.",
      "Porque a bolha vai virar uma tatuagem.",
      "Porque a bolha vai sumir em 5 minutos.",
      "Porque o machucado desaparece se estourar."
    ],
    correctAnswerIndex: 0
  },
  {
    question: "O que você deve fazer se ficar preso em um quarto cheio de fumaça?",
    options: [      
      "Subir na cama e gritar bem alto.",
      "Ficar abaixado e tentar sair do quarto.",
      "Correr de um lado para o outro.",
      "Esconder-se dentro do armário."
    ],
    correctAnswerIndex: 1
  },
  {
    question: "O que você deve fazer se a sua roupa pegar fogo?",
    options: [
      "Parar, deitar no chão e rolar até o fogo apagar.",
      "Correr bem rápido para chamar alguém.",
      "Pular várias vezes até o fogo apagar.",
      "Tentar tirar a roupa correndo."
    ],
    correctAnswerIndex: 0
  }
];

export const QuizzPage = () => {
  const navigate = useNavigate();

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
       
        fetch('http://localhost:8000/api/sugerVideo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answers),
        })
        .then(res => res.json())
        .then(data => {
          console.log('Resposta da API:', data);
          navigate('/score', { state: { scoreValue: score, dataV: data } });
          sessionStorage.removeItem('score');
        })
        .catch(error => console.error('Erro ao enviar:', error));

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
