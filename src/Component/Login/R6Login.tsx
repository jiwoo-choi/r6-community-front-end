import React, { SetStateAction, Dispatch } from "react";
import { Transition, Image, Modal, Header, Button, Input, Icon, Form } from "semantic-ui-react";
import styled from "styled-components";
import './R6Login.css';
import { motion } from 'framer-motion'

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

export class R6Login extends React.Component<{stater :Dispatch<SetStateAction<number>>, loginStater: Dispatch<SetStateAction<number>>}>  {

    render(){
        return(
                <>
                <motion.div 
                    initial={{ opacity:0.1}}
                    animate={{ opacity:0.4}}
                    className="black-layer"
                    onClick={()=>{this.props.loginStater(0)}}
                /> 
                <motion.div className="login-content-layer">
                    <div className="login-content-layer relative">
                        <div className="left padder">
                            <div className="header login-text-center login-font">
                                로그인하기
                            </div>
                            <div className="sub-header login-text-center login-font">
                                안녕하세요! 만나서 반갑습니다.
                            </div>

                            <div className="form-container">
                                <Form.Field >
                                    <div className="margin-bottom-5"> <strong> 아이디 </strong>  </div>
                                    <Input className="margin-bottom-10" type="text" iconPosition='left' icon={"user"} placeholder="아이디 입력" fluid/>
                                    <div className="margin-bottom-5"> <strong> 비밀번호 </strong> </div>
                                    <Input className="margin-bottom-20" type='password' iconPosition='left' icon={"key"}  placeholder="비밀번호 입력" fluid />
                                    </Form.Field>
                            </div>

                            <Button fluid color={"green"}>로그인하기</Button>
                            <div className="margin-bottom-10"></div>
                            <div className="description login-font login-text-center">
                                로그인은 개인 정보 보호 정책 및  서비스 약관에 동의하는 것을 의미합니다.
                            </div>
                            <Button floated={"right"} color={"grey"} size={"small"} inverted className="register-button-bottom" onClick={()=>this.props.stater(1)}>회원가입하기</Button>
                        </div>
                        <div className="right">
                            <img src="./season18-he.jpg" className="image"/>
                        </div>

                    </div>
                </motion.div>
                </>
            )
        }
}

export default R6Login


/**
 * 
 * 
                <BLACKLAYER visible={this.props.globalState.isOpened} onClick={()=>{this.props.globalReactor.action.next({type:"MODALTOGGLE"})}}>
                </BLACKLAYER>
                
                <OTHERCONTENTS>
                    <Transition visible={this.props.globalState.isOpened} animation='scale' duration={200}>
                        <MODALCONTENTCONTAINER>
                            <MODALCONTENT>
                                <LEFT>
                                <HEADER>
                                    로그인하기
                                </HEADER>
                                <SUBHEADER>
                                    안녕하세요! 만나서 반갑습니다.   
                                </SUBHEADER>       

                                <FORMCONTAINER>
                                    <Form.Field >
                                        <div> <strong> 아이디 </strong>  </div>
                                        <Input type="text" iconPosition='left' icon={"at"} placeholder="이메일 입력" fluid/>
                                        <div> <strong> 비밀번호 </strong> </div>
                                        <Input type='password' iconPosition='left' icon={"key"}  placeholder="비밀번호 입력" fluid />
                                    </Form.Field>
                                    <div style={{height:'8px'}}></div>
                                    <Button fluid color={"green"}>로그인하기</Button>
                                </FORMCONTAINER>

                                        
                            <DESCRIPTION> 로그인은 개인 정보 보호 정책 및  서비스 약관에 동의하는 것을 의미합니다.
                            </DESCRIPTION>

                                <FOOTER>
                                    <div>
                                        아직 아이디가 없으시다구요?
                                        <a> 회원가입하기 </a>
                                    </div>
                                </FOOTER>
                            </LEFT>
                            <RIGHT>

                            
                                <RIGHTIMAGE src="./season18-he.jpg"/>
                                                            <ICON>
                                    <Icon size={"large"} name={"close"}></Icon>
                                </ICON>

                            </RIGHT>
                            </MODALCONTENT>
                        </MODALCONTENTCONTAINER>
                    </Transition>
                </OTHERCONTENTS>

 */
/**
  
                 
 */