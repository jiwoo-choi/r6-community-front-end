import React, { SetStateAction, Dispatch } from "react";
import { Transition, Image, Modal, Header, Button, Input, Icon, Form, Message } from "semantic-ui-react";
import styled from "styled-components";
import './R6Login.css';
import { motion } from 'framer-motion'
import LoginReactor, { LoginInitialState, LoginState } from "./R6LoginReactor";
import { filter, distinctUntilChanged, skip, map } from "rxjs/operators";
import _ from "lodash";
import { ForumReactorProps, ForumReactorProp } from "../../@0ForumReactor/ForumReactor";
import { withReactor } from "reactivex-redux";
import { createPortal } from "react-dom";
import { withRouter, RouteComponentProps } from "react-router-dom";

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

export class R6Login extends React.Component<ForumReactorProps & RouteComponentProps, LoginState>  {

    idInput = React.createRef<HTMLInputElement>();
    pwdInput = React.createRef<HTMLInputElement>();

    reactor?: LoginReactor | null;

    constructor(props:any){
        super(props)
        this.state = LoginInitialState;
    }


    componentDidMount(){

        this.reactor = new LoginReactor(LoginInitialState)        
        //if close => then 

        
        if (this.reactor) {

            //if is success.. => then 
            this.reactor.disposedBy = this.reactor?.state.pipe(
                filter((value,index) => { return value.isSuccess !== true}),
                distinctUntilChanged(_.isEqual),
                skip(1),
            ).subscribe(
                res => {
                    this.setState({...res})
                }
            )

            // login success
            this.reactor.disposedBy = this.reactor?.state.pipe(
                filter((value,index) => { return value.isSuccess === true}),
                distinctUntilChanged(_.isEqual),
                skip(1)
            ).subscribe(
                // res => this.props.history.push('/register')
            )

        }
    }
      
    componentWillUnmount(){
        this.reactor?.disposeAll();
        this.reactor = null;
    }

    handleClick(){
        // this.reactor?.dispatch({type:"CLOSELOGIN"})
        this.props.reactor_control.dispatcher({type:"CLICKLOGINOFFBUTTON"})()
    }

    render(){
        //isopen or not..
        
        const { isLoginModal } = this.props.reactor_control.getState();

        if (!isLoginModal) {
            return null;
        } else {
            return ( 
                <>
                    <motion.div 
                        initial={{ opacity:0.2}}
                        animate={{ opacity:0.6}}
                        className="black-layer"
                        onClick={this.props.reactor_control.dispatcher({type:"CLICKLOGINOFFBUTTON"})}
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
                            
                            <a className="login-content-exit-button" onClick={this.handleClick.bind(this)}> 닫기 </a>
                        
                            <div className="left">
                                {/* <img src={require('./season18-he.jpg')} />
                                <div className="login-content-imageLayer"></div>   */}
                                
                                <p className="login-header-text text-align-center">
                                    로그인하기
                                </p>

                                <Form error={this.state.isError}>
                                    <Message error negative 
                                    header={this.state.message}
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
                                    animate={ this.state.isError ? "errorOn" : "errorOff"}
                                    variants={ isError }
                                    transition={{ loop: 3, duration: 0.1}}
                                > 
                                    <Button fluid color={"green"} disabled={this.state.isLoading} loading={this.state.isLoading} className="success-button" onClick={()=>{                                        
                                        this.reactor?.dispatch({
                                            type:"LOGIN", 
                                            id: this.idInput.current!.value,
                                            pwd:this.pwdInput.current!.value
                                        })
                                    }}> 로그인하기 </Button>
                                 </motion.div>

                                <p className="description text-align-left">
                                    로그인은 개인 정보 보호 정책 및  서비스 약관에 동의하는 것을 의미합니다.
                                </p>
                                <Button fluid inverted className="register-button" onClick={()=>{
                                    this.props.history.push('/register')
                                }}> 회원가입하기 </Button>
                            </div>

                            <div className="right">
                                <img src={require('./season18-he.jpg')}/>
                            </div>
                            {/* 
                            <div className="header-text login-text-center login-font">
                                로그인하기
                            </div>

                            <div className="sub-header login-text-center login-font">
                                안녕하세요! 만나서 반갑습니다.
                            </div>

                            <div className="form-container" style={{marginBottom:'20px'}}>

                            <Form error={this.state.isError}>
                                <Form.Field >
                                    <label style={{color:'white'}}>아이디</label>
                                    <input placeholder='ID' ref={this.idInput}/>
                                </Form.Field>
                                <Form.Field>
                                    <label style={{color:'white'}}>비밀번호</label>
                                    <input placeholder='Password' type={"password"} ref={this.pwdInput}/>
                                </Form.Field>
                                <Message error negative>
                                <p>{this.state.message}</p>
                                </Message>
                            </Form>

                            </div>

                            <Button fluid color={"green"} disabled={this.state.isLoading} loading={this.state.isLoading} onClick={()=>{
                                this.reactor?.dispatch({
                                    type:"LOGIN", 
                                    id: this.idInput.current!.value,
                                    pwd:this.pwdInput.current!.value
                                })
                            }}>로그인하기</Button>
                            <div className="margin-bottom-10"></div>
                            <div className="description login-font login-text-left">
                                로그인은 개인 정보 보호 정책 및  서비스 약관에 동의하는 것을 의미합니다.
                            </div>
                            <Button floated={"right"} color={"grey"} size={"small"} inverted className="register-button-bottom" onClick={()=>this.props.history.push('/register')}>회원가입하기</Button> */}
                    </motion.div>

                    {/* </div> */}

                    {/* </motion.div> */}
                    {/* 
                    <motion.div className="login-content-layer">
                        <div className="login-content-layer relative">
                            <div className="left padder">
                                <div className="header-text login-text-center login-font">
                                    로그인하기
                                </div>
                                <div className="sub-header login-text-center login-font">
                                    안녕하세요! 만나서 반갑습니다.
                                </div>
    
                                <div className="form-container" style={{marginBottom:'20px'}}>
    
                                <Form error={this.state.isError}>
                                    <Form.Field >
                                        <label style={{color:'white'}}>아이디</label>
                                        <input placeholder='ID' ref={this.idInput}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={{color:'white'}}>비밀번호</label>
                                        <input placeholder='Password' type={"password"} ref={this.pwdInput}/>
                                    </Form.Field>
                                    <Message error negative>
                                    <p>{this.state.message}</p>
                                    </Message>
                                </Form>
    
                                </div>
    
                                <Button fluid color={"green"} disabled={this.state.isLoading} loading={this.state.isLoading} onClick={()=>{
                                    this.reactor?.dispatch({
                                        type:"LOGIN", 
                                        id: this.idInput.current!.value,
                                        pwd:this.pwdInput.current!.value
                                    })
                                }}>로그인하기</Button>
                                <div className="margin-bottom-10"></div>
                                <div className="description login-font login-text-center">
                                    로그인은 개인 정보 보호 정책 및  서비스 약관에 동의하는 것을 의미합니다.
                                </div>
                                <Button floated={"right"} color={"grey"} size={"small"} inverted className="register-button-bottom" onClick={()=>this.props.history.push('/register')}>회원가입하기</Button>
                            </div>
                            <div className="right">
                                <img src={require('./season18-he.jpg')} className="image"/>
                            </div>
    
                        </div>
                    </motion.div> */}
                    </>
              )
        }
    }
    
}

export default withRouter(withReactor(R6Login, (state) => ({isLoginModal: state.isLoginModal}))) 


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