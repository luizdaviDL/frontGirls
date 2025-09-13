import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
  const [selectedFase, setSelectedFase] = useState("");
  const [showModal, setShowModal] = useState(false); // Novo estado para controlar o modal
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showChecked, setShowChecked] = useState(false);
  const [getUserName, setgetUserName] = useState(false);
  const [alert, setAlert] = useState(false);

  {/**para mandar a imagem e user name*/}
const navigate = useNavigate();

const handleSave = (e) => {
  e.preventDefault(); 
  const userName = userRef.current.value;

  if(!userName){
    setAlert("por favor, digite o nome do usuario");
  }
  else if(!selectedFase){
    setAlert("por favor, selecione a fase do jogo");
  }else{
    navigate("/introducao", { state: { userNameV:  userName, fase: selectedFase} });
  }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 3000);
      return () => clearTimeout(timer); // limpa se o componente desmontar
    }
  }, [alert]);

  const userRef = useRef();

  const saveAndClose = () =>{
    setShowChecked(true);    
    handleCloseModal();
  }


  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character); // Define o personagem selecionado
  };



  return (
    <div className='formSc' style={{ width: "30rem", height: "38rem",  border: "1px solid #adadadff", display:"flex", justifyContent:"center", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", }}>

      {/**modal */}
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Informações do importantes</h5>              
            </div>
            <div class="modal-body">
              Trabalho de Conclusão de Curso sobre “Educação em Saúde nas Escolas: conscientização 
              para a prevenção de queimaduras com recurso de inteligência artificial.”
                <br/>
                <strong>Acadêmicas de Enfermagem:</strong> <br />
                Acsa Lino Geraldo <br />
                Evellyn Luiza da Cruz Martins <br />
                Sâmea Vitória Calazans de Araújo. <br />
                <strong>Orientadora:</strong> <br /> Mayara Annanda Oliveira Neves Kimura


            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">fechar</button>              
            </div>
          </div>
        </div>
      </div>

      {/**form */}
      <form>
        
        <section style={{ backgroundColor: '#A3CAD8', display: "flex", justifyContent: "center", height: "10rem" }}>     
          <img src="./loganCharacter.png" alt="" />
          <section >
            <h1 style={{color:"#FBFBFB", marginTop:"3rem"}}>Guardiões do Fogo </h1>
          </section>
        </section>
        <section style={{display:"flex", justifyContent:"center", marginTop:"1rem"}}>
          {alert &&
            <div class="alert alert-danger" role="alert" style={{width:"19rem"}}>
              {alert}
            </div>
          }          
        </section>

        {/**btn modal */}
        <section style={{display:"flex", justifyContent:"flex-end"}}>        
          <button type="button" class="btn" data-toggle="modal" data-target="#exampleModal">
            <img src="./info.png" style={{height:"2.5rem"}} />
          </button>
        </section>

          {/** */}
        <section style={{ marginTop:"-1.5rem",padding: "20px" }}>
          <div className="mb-3" style={{ marginTop: "1rem" }}>
            <label className="form-label" style={{ color: "#106780" }}>Usuario</label>
            <section style={styles.customSection}>
              <img
                src="./loginUser.png"
                style={styles.customImg}
                alt="User Icon"
              />
              <input
                type="text"
                className="form-control"
                style={styles.customInput}
                id="exampleInputEmail1"
                placeholder='ex: carlos silva'     
                ref={userRef}         
              />
            </section>
          </div>
          
          <section>
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{background:"#2F8689", color: "#FFFFFF"}}>
                  {selectedFase ? `Fase ${selectedFase}` : "Fase do jogo"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" onClick={() => setSelectedFase("1")}>Primeira</a>
                  <a className="dropdown-item" onClick={() => setSelectedFase("2")}>Segunda</a>
                  <a className="dropdown-item" onClick={() => setSelectedFase("3")}>Terceira</a>       
                </div>
              </div>
          </section>
        </section>
            <div style={{display:"flex", justifyContent:"center", marginTop:"3rem"}}>          
                <button  className="btn" style={{background:"#0E7B87", color:"#FFFFFF"}} onClick={handleSave}>Salvar</button>         
          </div>
      </form>
      
    </div>
  );
};

const styles = {
  customSection: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #106780',
    padding: '10px',
    borderRadius: '5px',
  },
  customImg: {
    width: '30px',
    height: '30px',
    marginRight: '10px',
  },
  customInput: {
    flex: 1,
    padding: '10px',
    outline: "none",
    border: "none",
  }
};
