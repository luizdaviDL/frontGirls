import React, { useEffect, useState } from 'react';
import { Button } from '../buttons/Button'
import { useOutletContext, Link,useNavigate, useLocation  } from 'react-router-dom';

export const InicialPage = ({image}) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
        useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth < 768);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);


    const text1 =  `Agora vamos assitir um video super legal que explica o que fazer em caso de uma queimadura
    🔥🏫. Vamos lá! 🎧✨`

    const text0 =  `Nesta primeira fase, você vai participar de um quiz super divertido para testar 
    seus conhecimentos sobre cuidados com queimaduras. Vamos aprender juntos e descobrir 
              como ficar longe do perigo!` 

    const textRound2 = `Agora é hora de responder umas perguntinhas bem legais pra ver se você aprendeu tudinho com o vídeo!
 🧠✨ Pronto pra mostrar o que fazer em uma situação de queimadura?
   Vamos nessa! 🚒✨`     

    const navigate = useNavigate();
    const location = useLocation();
    /*const newQuestions = location.state.question;
    const fasegame = location.state.fase;*/

  
    const {userNameV, fase} = location.state   
    // textIntrodution = `${userNameV}! ${text}`;
    let finalText = `Olá, ${userNameV}! `;

    if (fase == 1) {
    finalText += text0;
    } else if (fase == 2) {
    finalText += text1;
    } else if (fase == 3) {
    finalText += textRound2;
    }


    const handleClick = () => {
        if(fase==1 || fase==3){
            navigate("/quizz",{state:{userNameVa: userNameV}});
        }
        else if(fase==2){
            navigate("/video",{state:{userNameVa: userNameV}});
        }
    };
    return (
        <div style={{marginTop: isMobile? "2rem":"5rem"}}> {/**fit-content: serve para que se adapte automaticamente */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start", // mantém alinhado em cima
                gap: "1rem",
                flexWrap: "nowrap",       // impede quebrar para baixo
                marginTop: "1rem",
                flexDirection: "row",
                flexWrap: "wrap" // só se quiser quebrar em telas muito pequenas
            }}>
            {/* Personagem */}
            <div className="character" style={{ flexShrink: 0 }}>
                <div style={{ width: "20vw", minWidth: "100px", maxWidth: "150px" }}>
                    <img src={image} style={{ width: "100%", height: "auto", marginTop: "2rem" }} />
                </div>
            </div>
            {/* Texto */}
            <div className="textArea" style={{
                flex: 1,               // ocupa o resto do espaço
                minWidth: "200px",     // nunca fica menor que 200px
                maxWidth: "600px",     // nunca maior que 600px
                height: "fit-content",
                backgroundColor: "#FFFAFA",
                boxShadow: "0 0 10px #BEBEBE",
                borderRadius: "1rem",
                padding: ".80rem"
            }}>
                <p style={{ textAlign: "center", fontSize:"1.09rem" }}>{finalText}</p>
            </div>
            </div>

            <div style={{display: "flex", justifyContent: "center", marginTop:"8rem"}}>                
                <Button onClick={handleClick} text={"Começar"}/>          
            </div>
            
        </div>
  )
}
