import React from "react";
import styled from 'styled-components'


const FOOTERCONTAINER = styled.footer`
    background-color:#2C3031;
    height:300px;
    width:100%;
`

export default class R6Footer extends React.Component {

    render(){
        return(
            <FOOTERCONTAINER></FOOTERCONTAINER>
        )
    }

}