import {  QuadradoStyled } from './styles.js'

import { useEffect, useState } from 'react';

export default function Quadrado({index ,top, left, cor}){


    return(
        <QuadradoStyled
            key={index}
            style={{ top: top + 'px', left: left + 'px', backgroundColor: cor  }}
        />
    )
}