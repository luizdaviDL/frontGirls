import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../buttons/Button';

export const ScorePage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const scoreFromState = location.state?.scoreValue;
    const hendlePage = location.state?.page;
    const data = location.state.dataV;

    const [score, setScore] = useState(0);

    useEffect(() => {
        if (scoreFromState !== undefined) {
            setScore(scoreFromState);
        } else {
            // fallback: ler do sessionStorage
            const savedScore = sessionStorage.getItem('score');
            if (savedScore !== null) {
                setScore(Number(savedScore));
            }
        }
    }, [scoreFromState]);

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div>
            <div style={{display:"flex", justifyContent:"center", marginTop:isMobile ?"8rem": "0rem"}}>
                <div style={{
                    marginTop: isMobile? "0": "10rem",
                    backgroundColor:"#e3efd0ff",
                    width:isMobile? "18rem" :"29rem",
                    height: isMobile? "23rem" :"17rem",
                    borderRadius:"2rem",
                    display:"flex",
                    justifyContent:"center",
                    boxShadow:"0 0 10px #434343"
                }}>
                    <div>
                    <section style={{display: "flex", justifyContent:"center"}}>
                                <img src="./fineshCharacter.png" 
                            style={{ width: "10rem", height: "10rem", marginRight:"1rem" }}
                            alt="Personagem"
                            />
                        </section>
                        <section style={{marginTop:"1rem"}}>
                            <section style={{display: "flex",flexDirection: isMobile ? "column" : "row" }}>
                                <h4 style={{textAlign:"center", marginRight: ".5rem", width: "13rem"}}>Sua Pontuação:</h4>
                                <h2 style={{textAlign:"center", color:"#575757"}}>{score}</h2>                                    
                            </section>
                            <section style={{ display: "flex", alignItems: "center", flexDirection: isMobile ? "column" : "row"  }}>
                                <h4 style={{ minWidth: "11rem", marginRight: ".5rem" }}>Erros frequentes:</h4>
                                <h4 style={{ color: "#575757", whiteSpace: "nowrap"}}>{data}</h4>
                            </section>

                        </section>
                    </div>
                </div>
            </div>
            <section style={{marginTop:"2rem", display:"flex", justifyContent:"center"}}>
                <Button onClick={handleClick} text={"Finalizar"} />
            </section>
        </div>
    );
};
