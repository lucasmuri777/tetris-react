import styled from 'styled-components'

export const Center = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 40px;
`
export const Game = styled.div`
  width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`

export const Utilities = styled.div`
    width: 100%;
    height: 100px;
    background-color: #0c0c0c;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -2px -2px 3px #161616,
            inset -2px -2px 3px #0a0a0a
    ;
    border: 1px solid #111111;

  div{
    width: calc(100% / 3);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div svg{
    font-size: 30px;
    cursor: pointer;
  }
`

export const Container = styled.div`
    width: 100%;
    height: 600px;
    border:1px solid #111111;
    position: relative;
    overflow: hidden;
    box-shadow: -2px -2px 3px #161616,
            inset -2px -2px 3px #0a0a0a

    ;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`