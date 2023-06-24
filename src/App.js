import { useState, useEffect } from 'react';

import './App.css';

const posicoes = [
  0,50,100,150,200,250,300,350,400,450
]

function App() {
  const [controleTop, setControleTop] = useState(0)

  const [top, setTop] = useState(0)
  const [direcao, setDirecao] = useState(posicoes[Math.ceil(Math.random() * 9)])
  const [pontos, setPontos] = useState(0)
  
  
  useEffect(() => {
    const handleKeyPressed = (e) => {
      console.log(direcao);
      let tecla = e.key;
      switch (tecla) {
        case 'a':
          direcao >= 50 ? setDirecao(direcao - 50) : setDirecao(0);
          break;
        case 'd':
          direcao < 400 ? setDirecao(direcao + 50) : setDirecao(450);
          break;
        default:
          break;
      }
    };
  
    document.addEventListener('keydown', handleKeyPressed);
    return () => {
      document.removeEventListener('keydown', handleKeyPressed);
    };
  }, [direcao]);
  

  useEffect(()=>{
     //Implementing the setInterval method
     const interval = setInterval(()=>{
      if(top < 650){
        setTop(top + 50)
      }else{
        setTop(0)
      }
     }, 1000)

     return () => clearInterval(interval);

  }, [top])



  return (
    <div>

      <div id='center'>
        <div className='container'>
          <div className='quadrado' style={{top: top + 'px', left: direcao + 'px'}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
