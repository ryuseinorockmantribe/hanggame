import React, { useState, useEffect, useRef } from 'react';
import Popup from './components/PopUp';
import './App.css';
import Word from './components/Word';
import Figure from './components/Figure';


const words = ['application', 'programming', 'interface', 'wizard'];




function App() {

  const [endGame,setEndGame] = useState(false);
  const [palabraEscondida,setPalabraEscondida] = useState("");
  const [finalMessage,setFinalMessage] = useState("");
  

  const [palabraCorrectas,setPalabraCorrectas] = useState([]);
  const [palabrasIncorrectas,setPalabrasIncorrectas] = useState([]);

  const teclas = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const esPrimeraVez = useRef(true);
  const parabra = useRef("");

  const winner = () => {
    console.log("Gano ");
    setFinalMessage("Gano Felicidades");
  }

  const finJuego = () => {
    console.log("fin del juego ");
    setFinalMessage("fin del juego");
  }

  const restart = () => {
    console.log("en el restart");
    setPalabraCorrectas([]);
    setPalabrasIncorrectas([]);
    setFinalMessage("");
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    parabra.current = selectedWord;
  }

  useEffect(() => {

    if(palabraCorrectas.length > 0 & palabraEscondida.length == palabraCorrectas.length  ){
      winner();
   } 


  },[palabraCorrectas])


  useEffect(() => {

    if(palabrasIncorrectas.length > 5){
      finJuego();
   } 


  },[palabrasIncorrectas])

  const handleTeclaClick = (tecla) => {
    console.log('Tecla presionada:', tecla.toLowerCase());
    const pEscondida =  String(palabraEscondida);
    console.log("palabra escondida "+pEscondida);

    if(pEscondida.toLocaleLowerCase().includes(tecla.toLowerCase())){

      const newArrayCorrectas = [...palabraCorrectas,String(tecla).toLowerCase()];
      setPalabraCorrectas(newArrayCorrectas);

    }else{

     
      setPalabrasIncorrectas((prev) => {



          return [...prev,String(tecla).toLowerCase()];
        
      });
        
       
    }

    
  
 
 





  }

  useEffect(() => {

    if(esPrimeraVez){
      let selectedWord = words[Math.floor(Math.random() * words.length)];
      parabra.current = selectedWord;
      console.log('El componente se cargó por primera vez');
      esPrimeraVez.current = false;
      setPalabraEscondida(parabra.current);
    }
    


  },[])




  return(
    <div>
      <p>Palabra escondida </p>
  
      {Array.from(palabraEscondida).map((letra, index) => (
          <div key={index} style={{ display: 'inline-block' }}> 
              {<div>
                
                  <Word selectedWord={letra} correctLetters={palabraCorrectas} />
                
              </div>
              }
          </div>
        ))}
    
      <div key="teclado">
      
      {teclas.map((fila, filaIndex) => (
        <div key={filaIndex} style={{ display: 'flex' }}>
          {fila.map((tecla, teclaIndex) => (
            <button disabled={palabraCorrectas.includes(tecla.toLowerCase()) || palabrasIncorrectas.includes(tecla.toLowerCase())  }
              key={teclaIndex}
              onClick={(e) => {
                e.preventDefault();
                handleTeclaClick(tecla)}
              }
              style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
            >
              {tecla}
            </button>
          ))}
        </div>
            ))}

    

      </div>
            <Figure wrongLetters={palabrasIncorrectas} />
              <Popup restart={restart} finalMessage={finalMessage} />

    </div>
  )

}


export default App;