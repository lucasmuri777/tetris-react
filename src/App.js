import React, { useState, useEffect } from 'react';
import './App.css';

const posicoes = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450];

function App() {
  const [top, setTop] = useState(0);
  const [direcao, setDirecao] = useState(posicoes[Math.floor(Math.random() * 10)]);
  const [blocos, setBlocos] = useState([{ top: -100, left: -100, cor: gerarCorHexAleatoria() }]);
  const [decida, setDecida] = useState(false);
  const [cor, setCor] = useState(gerarCorHexAleatoria)

  useEffect(() => {
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
        if(dir === 'a'){
          for (const e of blocos) {
            if (e.left === direcao - 50 ) {
              andar = false
              break;
            }
          }if(andar){
            setDirecao((prevDirecao) => (prevDirecao >= 50 ? prevDirecao - 50 : 0));
            
          }
        }
        if(dir === 'd'){
          for (const e of blocos) {
            if (e.left === direcao + 50 ) {
              andar = false
              break;
            }
          }if(andar){
            setDirecao((prevDirecao) => (prevDirecao < 400 ? prevDirecao + 50 : 450));
          }
        }
      }
    };

    

    document.addEventListener('keydown', handleKeyPressed);
    return () => {
      document.removeEventListener('keydown', handleKeyPressed);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      addBlocos();
    }, decida ? 100 : 500);

    return () => clearInterval(interval);
  }, [top, decida]);

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

  return (
    <div>
      <div id='center'>
        {decida && <h2>Speed On</h2>}
        <div className='container'>
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
