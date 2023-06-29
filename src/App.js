import React, { useState, useEffect } from 'react';
import './App.css';
import { FaPause, FaPlay, FaRunning, FaRetweet } from "react-icons/fa";
import ScreenFreeze from './components/ScreenFreeze/ScreenFreeze';


const posicoes = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450];

function App() {
  const [top, setTop] = useState(0);
  const [direcao, setDirecao] = useState(posicoes[Math.floor(Math.random() * 10)]);
  const [blocos, setBlocos] = useState([{ top: -100, left: -100, cor: gerarCorHexAleatoria() }]);
  const [decida, setDecida] = useState(false);
  const [cor, setCor] = useState(gerarCorHexAleatoria)
  const [pause, setPause] = useState(true)
  const [perdeu, setPerdeu] = useState(false)

  useEffect(() => {
    if(!pause){
      const handleKeyPressed = (e) => {
        let tecla = e.key;
        switch (tecla) {
          case 'a':
            mudarDirecao('a')
            break;
          case 'd':
            mudarDirecao('d')
            break;
          case 's':
            setDecida((prevDecida) => !prevDecida);
            break;
          default:
            break;
        }
        function mudarDirecao(dir){
          let andar = true
          if(dir == 'a'){
            for (const e of blocos) {
              if (e.left === direcao - 50 && e.top == top || e.left === direcao - 50 && e.top == top + 50 ) {
                andar = false
                break;
              }
            }
            if(andar){
              setDirecao((prevDirecao) => (prevDirecao >= 50 ? prevDirecao - 50 : 0));
            
            }
          }
          if(dir === 'd'){
            for (const e of blocos) {
              if (e.left === direcao + 50 && e.top == top || e.left === direcao - 50 && e.top == top + 50 ) {
                andar = false
                break;
              }
            }if(andar){
              setDirecao((prevDirecao) => (prevDirecao < 400 ? prevDirecao + 50 : 450));
            
            }
          }
        }
      
    };

    function Perdeu(){
      blocos.forEach((e)=>{
        if(e.top <= 0 && e.top != -100){
          setPerdeu(true)
          setPause(true)
        }
      })
    }
    Perdeu()

    

    document.addEventListener('keydown', handleKeyPressed);
    return () => {
      document.removeEventListener('keydown', handleKeyPressed);
    };
  }
  }, [blocos, top, pause]);

  useEffect(() => {
    if(!pause){
      const interval = setInterval(() => {
        addBlocos();
      }, decida ? 100 : 500);

      return () => clearInterval(interval);
    }
  }, [top, decida, pause]);

  function addBlocos() {
    let proximo = top + 50;
    let colocou = false;

    blocos.forEach((e) => {
      if (e.top === proximo && e.left === direcao) {
        setBlocos([...blocos, { top: top, left: direcao, cor: cor }]);
        setTop(0);
        setDirecao(posicoes[Math.floor(Math.random() * 10)]);
        setCor(gerarCorHexAleatoria)
        colocou = true;
      }
    });

    if (!colocou) {
      if (top < 650) {
        setTop(top + 50);
      } else {
        setBlocos([...blocos, { top: top, left: direcao, cor: cor }]);
        setTop(0);
        setDirecao(posicoes[Math.floor(Math.random() * 10)]);
        setCor(gerarCorHexAleatoria)
      }
    }
  }

  function gerarCorHexAleatoria() {
    var letrasHex = '0123456789ABCDEF';
    var cor = '#';
    for (var i = 0; i < 6; i++) {
      cor += letrasHex[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  function handlePause(){
    setPause(!pause)
  }
  function handleReset(){
    setBlocos([{ top: -100, left: -100, cor: gerarCorHexAleatoria() }])
    setTop(0)
    setDirecao(posicoes[Math.floor(Math.random() * 10)])
    setDecida(false)
    if(perdeu){
      setPause(false)
    }else{
      setPause(true)
    }
    setPerdeu(false)
  }


  return (
    <div>
      <div id='center'>
        <div className='utilities'>
          <div className='running-wrapper'>
            {decida ? (
              <FaRunning/>
            ):(<h3>Running off</h3>)}
          </div>
          <div className='pause-wrapper'>
            {pause == true &&(
              <a className='pause' onClick={handlePause}>{<FaPlay/>}</a>
              )}
            {pause == false &&( 
                <a className='pause' onClick={handlePause}>{<FaPause/>}</a>
            )}
          </div>
          <div className='reset-wrapper'>
            <a onClick={handleReset}><FaRetweet/></a>
          </div>
        </div>

        <div className='container'>
          {pause &&(
            <ScreenFreeze type={perdeu} clique={handlePause} reset={handleReset}/>
          )}
          <div className='quadrado' style={{ top: top + 'px', left: direcao + 'px', backgroundColor: cor }}></div>
          {blocos.map((e, index) => (
            <div
              key={index}
              className='quadrado'
              style={{ top: e.top + 'px', left: e.left + 'px', backgroundColor: e.cor }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
