import { Container, ItemWrapper } from './styles.js'

import { FaPlay, FaSadTear, FaRetweet} from "react-icons/fa";

import { useEffect, useState } from 'react';

export default function ScreenFreeze({type, clique, reset}){
    const [cor, setCor] = useState('#1d1d1dcc')
    useEffect(()=>{
        if(type){
            setCor('#812121cc')
        }
    },[])
    return(
        <Container back={cor}>
            {type ?(
                <ItemWrapper>
                    <FaSadTear/>
                    <h3>Você Perdeu!</h3>
                    <p>Tente novamente</p>
                    <FaRetweet onClick={reset}/>
                </ItemWrapper>
            ):(
                <FaPlay onClick={clique}/>
            )}
        </Container>
    )
}