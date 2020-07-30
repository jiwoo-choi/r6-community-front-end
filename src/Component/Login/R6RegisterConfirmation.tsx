import R6LottieLoader from "../R6LottieLoader";
import React, { SetStateAction, Dispatch } from "react";
import { Header, Button } from "semantic-ui-react";
import styled from "styled-components";
import R6RegisterReactor from "./R6RegisterReactor";


const CENTER = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
export default class R6RegisterConfirmation extends React.Component<{stater :Dispatch<SetStateAction<number>>}> {

    render(){
        return(
        <>
            <CENTER>
                <Header size={"huge"}> 회원가입 인증메일을 보냈어요! </Header>
                <span> 메일이 도착하지 않았다면, 스팸함도 체크해주세요! </span>
                {/* //https://assets10.lottiefiles.com/packages/lf20_WeHQsV.json */}
                {/* https://assets1.lottiefiles.com/packages/lf20_y9qOnk.json */}
                <R6LottieLoader path={"https://assets1.lottiefiles.com/packages/lf20_y9qOnk.json"} speed={0.8} width={350} height={350}/>
                <Button fluid color="green" onClick={()=>this.props.stater(0)}> 돌아가기 </Button>
            </CENTER> 
        </>
        )
    }
}

