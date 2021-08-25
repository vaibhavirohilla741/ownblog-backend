import React from 'react'
import styled from "styled-components"
import navbg from "../../img/nav-bg.jpg"

const MainContainer = styled.header`
background: url(${navbg})no-repeat center/cover ;
height:25rem;
h1{
    transform: translate(-50%, -50%);
    color:#fff;
    font-weight:900;
    position:absolute;
    top:25%;
    left:50%;
}
`
const Header = () => {
    return (
        <MainContainer>
            <h1>Welcome To Your OWN-BLOGS World</h1>
        </MainContainer>
    )
}

export default Header
