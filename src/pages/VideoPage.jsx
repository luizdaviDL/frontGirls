
import { useLocation,useNavigate } from 'react-router-dom';
import { Button } from '../buttons/Button';
import React, { useState, useEffect } from 'react';



export const VideoPage = ({image, text}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const location = useLocation();
    const navigate = useNavigate();
    const [isVideoEnded, setIsVideoEnded] = useState(false); 
    //const audioName = location.state.dataV[1] ;

    //const audioPath = `/audio/${audioName}.mp3`

    const handleRounde2 = ()=>{
        navigate("/")
    }

    const handleVideoEnd = () => {
        setIsVideoEnded(true); // Set the state to true when the video ends
    };
  
    return (
        <div>
            <div className="container">
                <div style={{display:"flex", /*backgroundColor:"red",*/ height:"15rem", 
                    marginTop: isMobile? "0": "5rem",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "center" : "flex-start",
                }}>
                    <div className="character" style={{height:"20rem"}}>
                        <div style={{marginTop:"5rem"}}>
                            <img src={image}  style={{width:"8rem", height:"8rem", marginTop:"-1rem"}}/>   
                        </div>
                    </div>
                    <div className="textArea" style={{minWidth:"5rem", width:"20rem",height:"fit-content",backgroundColor:"#FFFAFA", boxShadow: "0 0 10px rgb(167, 167, 167)", borderRadius:"1rem",
                       // marginLeft:isMobile? "-1rem" :"0"
                    }}>
                        <p style={{textAlign:"center", padding:".50rem", fontSize:"1.09rem"}}>{text}</p>
                    </div>
                </div>

                <section style={{/*backgroundColor:"blue", */display:"flex", justifyContent:"center", height:"12rem", 
                    marginTop:isMobile? "6rem": "0"}}>
                    <video 
                        src="/video.mp4"
                        controls
                        onEnded={handleVideoEnd}
                        style={{ width: isMobile? "20rem": "32rem" , height:isMobile ?"15rem":"18rem", borderRadius: "8px",
                            boxShadow: "0 0 10px rgb(167, 167, 167)", marginLeft: isMobile ? "-1rem" : "0"}}
                    >
                        Your browser does not support the video tag.
                    </video>
                </section>

                {isVideoEnded && (
                    <section style={{display:"flex", justifyContent:"center", marginTop:isMobile? "4rem": "9rem"}}>
                        <Button onClick={handleRounde2} text={"Finalizar"}/>
                    </section>
                )}

            </div>
        </div>
    )
}
