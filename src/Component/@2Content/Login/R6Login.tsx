import React, { SetStateAction, Dispatch } from "react";
import { Transition, Image, Modal, Header, Button, Input, Icon, Form, Message } from "semantic-ui-react";
import styled from "styled-components";
import './R6Login.css';
import { motion } from 'framer-motion'
import _ from "lodash";
import { observer, inject } from "mobx-react";
import ForumStore from "../../Stores/ForumStore";
import LoginStore from "../../Stores/LoginStore";

const MODALCONTAINER = styled.div`
    position:fixed;
    z-index:50;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(23,25,29,.7);
`

const MODALCONTENTCONTAINER = styled.div`
    position:relative;

    display:flex;
    z-index:51;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
`

const MODALCONTENT = styled.div`
    position:relative;
    background:#2c3035;
    color:white;
    max-width:700px;
    width: 100%;
    text-align:center;
    overflow:hidden;
    border-radius:10px;
    height:432px;
    display:flex;
`

const LEFT = styled.div`
    position:relative;
    flex:1;
`

const RIGHT = styled.div`
    position:relative;
    overflow:hidden;
    flex:0.62;
    display:flex;
`

const RIGHTIMAGE= styled.img`
    position:relative;
    height:100%;
    left:-50%;
`

const HEADER = styled.div`
    padding:50px 0 30px;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-weight:700;
    color:#e5e6e7;
    font-size:2.3rem;
`


const SUBHEADER = styled.p`
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-weight:700;
    color:#b6b7b8;
    font-size:1.4rem;
`


const FORMCONTAINER = styled.div`
    width:100%;
    padding:0 40px;
    text-align:left;

    div { 
        margin-bottom:5px;
    }
`

const MOCKUP = styled.div`
`

const DESCRIPTION = styled.p`
    position:relative;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    color:#646568;
    padding:0 30px;
    font-size:0.8rem;
    padding-top:10px;
`

const ICON = styled.div`
    position:absolute;
    top:10px;
    right:10px;
    background:#2c3035;
    width:30px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:10px;
    i.icon {
        margin:0px;
    }
`

const FOOTER = styled.div`
    position:absolute;
    bottom:20px;
    right:40px;
`

const BLACKLAYER = styled.div<{visible: boolean}>`
    display:${props => props.visible? "block;" : "none;"}
    position:fixed;
    z-index:50;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(23,25,29,.7);
`

const OTHERCONTENTS = styled.div`
    position:fixed;
    z-index:50;
    top:50%;
    left:50%;
    transform : translate3d(-50%, -50%, 0);
`



const isError = {
    errorOn : { x : [0, -5, 0, 5, 0] },
    errorOff : { x : 0 }
}

interface Props {
    forum?: ForumStore;
    login?: LoginStore;
}

@inject(({forum, login}) => ({login : login, forum: forum}))
@observer
export class R6Login extends React.Component<Props>  {

    idInput = React.createRef<HTMLInputElement>();
    pwdInput = React.createRef<HTMLInputElement>();

    handleBlackLayer(){
        this.props.forum!.openLoginModal(false);
        this.props.login?.resetState();
    }

    handleLogin(){
        this.props.login?.login(this.idInput.current!.value, this.pwdInput.current!.value);
    }

    render() {
        
        const { isLoginModalOpened  } = this.props.forum!;
        const { isLoginError, errorMessage, isLoginLoading  } = this.props.login!;

        if (!isLoginModalOpened) {
            return null;
        } else {
            return  <>
            <motion.div 
                initial={{ opacity:0.2}}
                animate={{ opacity:0.6}}
                className="black-layer"
                onClick={this.handleBlackLayer.bind(this)}
            /> 
            {/* <div className="login-container"> */}
            <motion.div 
                    initial={{ scale:0.95,  y : '100%', opacity: 0}}
                    animate={{ scale:1, y : '0%', opacity : 1}}
                    className="login-content-container" 
                    transition = {{
                        when: "beforeChildren",
                        type:"spring",
                        // stiffness: 20,
                        mass:0.1,
                    }}>
                    
                    <a className="login-content-exit-button" onClick={this.handleBlackLayer.bind(this)}> 닫기 </a>
                
                    <div className="left">
                        {/* <img src={require('./season18-he.jpg')} />
                        <div className="login-content-imageLayer"></div>   */}
                        
                        <p className="login-header-text text-align-center">
                            로그인하기
                        </p>

                        <Form error={isLoginError}>
                            <Message error negative 
                            header={errorMessage}
                            />

                            <Form.Field >
                                <label style={{color:'white'}}>아이디</label>
                                <input placeholder='ID' ref={this.idInput}/>
                            </Form.Field>
                            <Form.Field>
                                <label style={{color:'white'}}>비밀번호</label>
                                <input placeholder='password' type={"password"} ref={this.pwdInput}/>
                            </Form.Field>
                        </Form>

                        <motion.div 
                            animate={ isLoginError ? "errorOn" : "errorOff"}
                            variants={ isError }
                            transition={{ loop: 3, duration: 0.1}}
                        > 
                            <Button fluid color={"green"} disabled={isLoginLoading} loading={isLoginLoading} className="success-button" onClick={this.handleLogin.bind(this)}> 로그인하기 </Button>
                         </motion.div>

                        <p className="description text-align-left">
                            로그인은 개인 정보 보호 정책 및  서비스 약관에 동의하는 것을 의미합니다.
                        </p>
                        <Button inverted className="register-button" onClick={()=>{
                            // this.props.history.push('/register')
                        }}> 회원가입하기 </Button>
                    </div>

                    <div className="right">
                        <img src={require('./season18-he.jpg')}/>
                    </div>
                
            </motion.div>

            </>
        }

       
    }
    
}

export default R6Login