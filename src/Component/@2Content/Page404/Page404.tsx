

import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import { BrowserRouterProps, RouteComponentProps, withRouter } from 'react-router-dom'

const STYLED = styled.div`
    height: calc(100vh - 70px);
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    flex-direction: column;

    & img {
        height : 180px;
        width: 180px;
    }

    & div {
        font-size:1.2rem;
        font-weight:bold;
    }
  
    @media screen and (max-width: 700px) {

        & img {
            height:100px;
            width:100px;
        }

      }

`

function Page404({history} : RouteComponentProps) {

    return (
        <STYLED>
            <img src={require('./error.png')}/>
            <div> 존재하지 않는 페이지 입니다.</div>
            <Button color={"black"} size={"medium"} onClick={history.goBack}> 돌아가기 </Button>
        </STYLED>
    )
}

export default withRouter(Page404);
