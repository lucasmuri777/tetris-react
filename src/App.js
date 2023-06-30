import React, { useState, useEffect } from 'react';
import './App.css';
import { FaPause, FaPlay, FaRunning, FaRetweet } from "react-icons/fa";
import ScreenFreeze from './components/ScreenFreeze/ScreenFreeze';
import Quadrado from './components/Quadrado/Quadrado';

import {  Container, Utilities, Center, Game } from './style.js'
import Controle from './components/Controle/Controle';



const posicoes = [0, 50, 100, 150, 200, 250, 300, 350, 400];

function App() {
  const [top, setTop] = useState(0);
  const [direcao, setDirecao] = useState(posicoes[Math.floor(Math.random() * 9)]);
  const [blocos, setBlocos] = useState([{ top: -100, left: -100, cor: gerarCorHexAleatoria() }]);
  const [decida, setDecida] = useState(false);
  const [cor, setCor] = useState(gerarCorHexAleatoria)
  const [pause, setPause] = useState(true)
  const [perdeu, setPerdeu] = useState(false)

  function handleKeyPressed(e){
    let tecla = e
    if(e != 'a' && e != 'd' && e != 's'){
      tecla = e.key;
    }    
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
    
  };
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
        if (e.left === direcao + 50 && e.top == top || e.left === direcao + 50 && e.top == top + 50 ) {
          andar = false
          break;
        }
      }if(andar){
        setDirecao((prevDirecao) => (prevDirecao < 350 ? prevDirecao + 50 : 400));
        
      }
    }
  }

  useEffect(() => {
      if(!pause){
        
      

      function Perdeu(){
        blocos.forEach((e)=>{
          if(e.top <= 0 && e.top != -100){
            setPerdeu(true)
            setPause(true)
          }
        })
      }
      Perdeu()

      /*descer bloco */
      const interval = setInterval(() => {
        addBlocos();
      }, decida ? 100 : 260);
      

      document.addEventListener('keyup', handleKeyPressed);
      
      return () => {
        document.removeEventListener('keyup', handleKeyPressed);
        clearInterval(interval);
      };
    }
  }, [blocos, top, pause, direcao, decida]);

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
      if (top < 550) {
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
      <Center>
        <Game>
          <Utilities>
            <div>
              {decida ? (
                <FaRunning/>
              ):(<h3>Running off</h3>)}
            </div>
            <div>
              {pause == true &&(
                <a className='pause' onClick={handlePause}>{<FaPlay/>}</a>
                )}
              {pause == false &&( 
                  <a className='pause' onClick={handlePause}>{<FaPause/>}</a>
              )}
            </div>
            <div>
              <a onClick={handleReset}><FaRetweet/></a>
            </div>
          </Utilities>

          <Container>
            {pause &&(
              <ScreenFreeze type={perdeu} clique={handlePause} reset={handleReset}/>
            )}
            <Quadrado top={top} left={direcao} cor={cor}/>
            {blocos.map((e, index) => (
              <Quadrado index={index} top={e.top} left={e.left} cor={e.cor}/>
            ))}
          </Container>
          <Controle funcao={handleKeyPressed}/>
        </Game>
      </Center>
  );
}

export default App;
