import { Form, Button, Header, Input, Message } from "semantic-ui-react";
import React, { Dispatch, SetStateAction } from "react";
import './R6Register.css'
import { motion } from "framer-motion";
import R6RegisterReactor, { RegisterInitialState, RegisterState } from "./R6RegisterReactor";
import { stateUntilChanged } from 'reactivex-redux'
import { deepDistinctUntilChanged } from "../../Library/RxJsExtension";
import { filter , skip, distinctUntilChanged, map } from "rxjs/operators";
import _ from "lodash";
import R6LottieLoader from "../R6LottieLoader";
import R6RegisterConfirmation from "./R6RegisterConfirmation";
//#36393f
//https://gist.github.com/barbiturat/49facf4eeec1e2a5352ff4fa6bbf7286
//https://gist.github.com/barbiturat/49facf4eeec1e2a5352ff4fa6bbf7286
// 김종민님 + 인프런 인터렉티브 웹<div className=""></div>


class R6Register extends React.PureComponent<{stater :Dispatch<SetStateAction<number>>}, RegisterState> {

    reactor?: R6RegisterReactor | null;

    idInput = React.createRef<HTMLInputElement>();
    pwdInput = React.createRef<HTMLInputElement>();
    pwd2Input = React.createRef<HTMLInputElement>();
    emailInput = React.createRef<HTMLInputElement>();

    constructor(props:any) {
        super(props);
        this.state = RegisterInitialState;
    }

    UNSAFE_componentWillMount(){
        this.reactor = new R6RegisterReactor(RegisterInitialState)        
    }
    
    componentDidMount(){

        
        if (this.reactor) {
            this.reactor.disposedBy = this.reactor?.state.pipe(
                filter((value,index) => { return value.isSuccess !== true}),
                distinctUntilChanged(_.isEqual),
                skip(1),
            ).subscribe(
                res => {
                    this.setState({...res})
                }
            )
            //isSuccess..
            this.reactor.disposedBy = this.reactor?.state.pipe(
                filter((value,index) => { return value.isSuccess === true}),
                distinctUntilChanged(_.isEqual),
            ).subscribe(
                res => {
                    this.setState({isSuccess : true })
                }
            )

        }
    }

    componentWillUnmount(){
        this.reactor?.disposeAll();
        this.reactor = null;
    }

    render(){
       return( 
        <>
    
        <div className="register-container">
            <div className="register-background-img"> </div>
            <motion.div 
                className="register-black-layer"
                initial={{ opacity:0.1}}
                animate={{ opacity:0.5}}
            />

            <motion.div 
                className="register-content"   
                initial={{ scale: 1.1, opacity:0.5, y:'-5%' }}
                animate={{ scale: 1, opacity:1, y:'0%'}}
                // transition={{
                //     type: "spring",
                //     stiffness: 260,
                //     damping: 20
                // }}>
                >

                { this.state.isSuccess ? <R6RegisterConfirmation stater={this.props.stater}/> 
                :
                (<React.Fragment>
                    <Header className="header-center" size={"huge"}> 계정 만들기 </Header>
                    <Form error={this.state.isError}>
                        <Message
                            error
                            header={this.state.messageHeader}
                            content={this.state.messageDesc}
                        />
                        <Form.Field required error={this.state.isIdError}>
                        <label>아이디</label>
                        <input placeholder='ID' ref={this.idInput}/>
                        </Form.Field>
                        <Form.Field required error={this.state.isPwdError}>
                        <label>비밀번호</label>
                        <input placeholder='Password' type={"password"} ref={this.pwdInput}/>
                        </Form.Field>
                        <Form.Field required error={this.state.isPwd2Error}>
                        <label>비밀번호 확인</label>
                        <input placeholder='Password' type={"password"} ref={this.pwd2Input}/>
                        </Form.Field>
                        <Form.Field required error={this.state.isEmailError}>
                        <label>인증용 아이디</label>
                        <input placeholder='Email' type={"email"} ref={this.emailInput}/>
                        </Form.Field>
                    </Form>

                    <Button id="button-top-margin" type='submit' fluid color={this.state.isError? "red" : "green"} loading={this.state.isValidated} disabled={this.state.isValidated}
                    onClick={()=>{
                        this.reactor?.dispatch(
                            {
                                type:"SUBMIT", 
                                id : this.idInput.current!.value,
                                email : this.emailInput.current!.value,
                                pwd : this.pwdInput.current!.value,
                                pwd2 : this.pwd2Input.current!.value,

                            })
                        }}>계속하기</Button>

                    <div className="button-bottom-top"><a onClick={()=>{this.props.stater(0)}}> 이미 계정이 있으신가요? </a> </div>
                    <div> 등록하는 순간 R6-Community 서비스의 <a>이용 약관</a>과 <a>개인정보 보호 정책</a>에 동의하게 됩니다. </div>
                    </React.Fragment>
                )}
            </motion.div>

        </div>


        </>
       )
    
    }
}

export default R6Register