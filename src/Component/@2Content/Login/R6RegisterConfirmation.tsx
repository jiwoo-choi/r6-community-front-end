import React from "react";
import { R6LottieLoader } from "../../@Reusable-Component";
import { Header, Button } from "semantic-ui-react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Media from 'react-media';


const CENTER = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

function R6RegisterConfirmation({ history } : RouteComponentProps) {

    return(
        <CENTER>
            <Media query={{ maxWidth: 599 }}>
                {matches =>
                    matches ? (
                        <>
                        <Header size={"small"}> 회원가입 인증메일을 보냈어요! </Header>
                        <span> 메일이 도착하지 않았다면, 스팸함도 체크해주세요! </span>
                        <R6LottieLoader key={"1"} path={"https://assets1.lottiefiles.com/packages/lf20_y9qOnk.json"} speed={0.8} width={150} height={150}/>
                       <Button fluid color="green" onClick={()=> history.push('/')}> 돌아가기 </Button>
                        </>
                    ) : (
                        <>
                            <Header size={"huge"}> 회원가입 인증메일을 보냈어요! </Header>
                            <span> 메일이 도착하지 않았다면, 스팸함도 체크해주세요! </span>
                            <R6LottieLoader key={"2"} path={"https://assets1.lottiefiles.com/packages/lf20_y9qOnk.json"} speed={0.8} width={300} height={300}/>
                            <Button fluid color="green" onClick={()=> history.push('/')}> 돌아가기 </Button>
                        </>
                    )
                }
            </Media>
        </CENTER> 
    )
}

export default withRouter(R6RegisterConfirmation)