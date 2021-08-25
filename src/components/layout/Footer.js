import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
background:#344;
height: 4rem;
left:0;
bottom:0;
width:100%;

`

const Footer = () => {
    return (
        <FooterContainer>
            <span style={{color:"#fff", top:"1.5rem",position:"relative",left:"1rem"}}>
                &copy;{new Date().getFullYear()}All rights reserved.
            </span>
        </FooterContainer>
    )
}

export default Footer
