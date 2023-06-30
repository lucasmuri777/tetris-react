import {  Container } from './styles.js'
import { FaRunning } from "react-icons/fa";

export default function Controle({funcao}){
    return(
        <Container>
            <a onClick={()=>funcao('s')}><FaRunning/></a>
            <a onClick={()=>funcao('a')}>A</a>
            <a onClick={()=>funcao('d')}>D</a>

        </Container>
    )
}