import React from "react";
import styled from 'styled-components'

//https://cocoder.tistory.com/158

const FOOTERCONTAINER = styled.footer`
    background-color:#2C3031;
    height:300px;
    width:100%;
`

const FROUMMARGIN = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    padding: 50px 1rem;
`

const HELLO = styled.div`
    font-family: 'Anton',sans-serif;
    font-size: 2.8rem;
    cursor: none;
    text-decoration: unset;
    color: white;
    opacity:0.3;
`

export default class R6Footer extends React.Component {
    
    render(){
        return(
            <FOOTERCONTAINER>
                <FROUMMARGIN>
                    <HELLO> R6-Search Talk </HELLO>
                    <div> Family Site </div>
                    <div> R6 Search.me </div>
                    <div> R6 Search.me </div>

                </FROUMMARGIN>
            </FOOTERCONTAINER>
        )
    }

}