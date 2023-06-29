import styles from './screen.css'

import { FaPlay, FaSadTear, FaRetweet} from "react-icons/fa";

import { useEffect, useState } from 'react';

export default function ScreenFreeze({type, clique, reset}){
    const [perdeu, setPerdeu] = useState('pause')
    useEffect(()=>{
        console.log(type)
        if(type){
            setPerdeu('loss')
        }
    },[])
    return(
        <div className={`ScreenFreeze ${perdeu}`}>
            {type ?(
                <div className='item-wrapper'>
                    <FaSadTear/>
                    <h3>Você Perdeu!</h3>
                    <p>Tente novamente</p>
                    <FaRetweet onClick={reset}/>
                </div>
            ):(
                <FaPlay onClick={clique}/>
            )}
        </div>
    )
}