import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
    text-align: center;
`
const Footer = () => {
    return (
        <StyledFooter>
            <span dangerouslySetInnerHTML={{ "__html": "&copy; Tore Berg 2021. All rights reserved." }} />
        </StyledFooter>
    )
}

export default Footer