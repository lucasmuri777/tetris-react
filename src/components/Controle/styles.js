import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    height: 100px;
    width: 100%;
    margin-top: 10px;
    box-shadow: -2px -2px 3px #161616,
            inset -2px -2px 3px #0a0a0a;

    a{
        width: calc(100% / 3 - 60px);
        height: calc(100% - 40px);
        border-radius: 15px;
        box-shadow: -2px -2px 3px #161616,
            inset -2px -2px 3px #0a0a0a;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        cursor: pointer;
        margin: 30px;
        background-color: #0c0c0c;
    }
    a:active{
        transform: scale(0.85);
    }
            
`