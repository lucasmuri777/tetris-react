import styled from 'styled-components'

export const Container = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: ${props => props.back};
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 99;
    padding-bottom: 50px;

    svg{
        cursor: pointer;
        font-size: 60px;
        transition: 0.5s all;
    }
    svg:hover{
        transform: scale(1.2);
    }
`

export const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    *{
        width: 100%;
        text-align: center;
        margin: 10px 0; 
    }
    h3{
        font-size: 40px;
    }
    p{
        font-size: 20px;
    }
`

/*


.item-wrapper{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.item-wrapper *{
    width: 100%;
    text-align: center;
    margin: 10px 0;
}
.item-wrapper h3{
    font-size: 40px;
}
.item-wrapper p{
    font-size: 20px;
}
*/