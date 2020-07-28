import React from "react";
import styled from 'styled-components'
import { Button } from "semantic-ui-react";

const NAVIGATIONSTYLE = styled.nav`
    max-width:1200px;
    height:70px;
`

const GLOBALNAV = styled.nav`
	position: relative;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 75px;
`

const NAVITEMS = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;

`

const BRANDLOGO = styled.a`
    font-family: 'Anton', sans-serif;
    font-size: 2.8rem;
    color:black;
    cursor: pointer;
    text-decoration: unset;
    margin-right:auto;

    &:hover {
        color: black;
    }
  
`
//onClick={()=>{this.props.globalReactor.action.next({type:"MODALTOGGLE"})}}
class R6Navigation extends React.Component<{stater: any}> {
    
    render(){
        return(
            <GLOBALNAV>
                <NAVITEMS>
                    <BRANDLOGO> R6 Search - TALK </BRANDLOGO>
                    <Button secondary compact onClick={()=>{this.props.stater(1)}}>로그인하기</Button>
                </NAVITEMS>
            </GLOBALNAV>
        )
    }
}

export default R6Navigation;