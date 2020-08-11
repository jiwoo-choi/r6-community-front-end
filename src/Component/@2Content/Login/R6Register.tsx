import { Form, Button, Header, Message } from "semantic-ui-react";
import React from "react";
import './R6Register.css'
import { motion } from "framer-motion";
import _ from "lodash";
import R6RegisterConfirmation from "./R6RegisterConfirmation";
import Media from "react-media";
import { inject, observer } from "mobx-react";
import RegisterStore from "../../Stores/RegisterStore";
//#36393f
//https://gist.github.com/barbiturat/49facf4eeec1e2a5352ff4fa6bbf7286
//https://gist.github.com/barbiturat/49facf4eeec1e2a5352ff4fa6bbf7286
// 김종민님 + 인프런 인터렉티브 웹<div className=""></div>


interface Props {
    register?: RegisterStore;
}

@inject('register')
@observer
class R6Register extends React.PureComponent<Props> {

    idInput = React.createRef<HTMLInputElement>();
    pwdInput = React.createRef<HTMLInputElement>();
    pwd2Input = React.createRef<HTMLInputElement>();
    emailInput = React.createRef<HTMLInputElement>();
 

    clickHandler(){
        this.props.register?.registerRequest(
            this.idInput.current!.value,
            this.pwdInput.current!.value,
            this.pwd2Input.current!.value,
            this.emailInput.current!.value,
        )
    }

    render(){

        const { 
            idError,
            pwdError,
            pwd2Error,
            isError,
            isConfirmation,
            errorMessage,
            emailError,
            isLoading,
         } = this.props.register!
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
                >

                { !isConfirmation ? <R6RegisterConfirmation/> 
                :
                (<React.Fragment>
                    <Form error={isError}>
                        <Media query={{ maxWidth: 599 }}>
                            {matches =>
                                matches ? (
                                    <Header className="header-center" size={"medium"}> 계정 만들기 </Header>
                                ) : (
                                    <Header className="header-center" size={"huge"}> 계정 만들기 </Header>
                                )
                            }
                        </Media>
                        <Message
                            error
                            header={errorMessage}
                            
                        />
                        <Form.Field required error={idError}>
                        <label>아이디</label>
                        <input placeholder='ID' ref={this.idInput}/>
                        </Form.Field>
                        <Form.Field required error={pwdError}>
                        <label>비밀번호</label>
                        <input placeholder='Password' type={"password"} ref={this.pwdInput}/>
                        </Form.Field>
                        <Form.Field required error={pwd2Error}>
                        <label>비밀번호 확인</label>
                        <input placeholder='Password' type={"password"} ref={this.pwd2Input}/>
                        </Form.Field>
                        <Form.Field required error={emailError}>
                        <label>인증용 아이디</label>
                        <input placeholder='Email' type={"email"} ref={this.emailInput}/>
                        </Form.Field>
                    </Form>

                    <Button id="button-top-margin" type='submit' fluid color={isError? "red" : "green"} loading={isLoading} disabled={isLoading}
                    onClick={this.clickHandler.bind(this)}>계속하기</Button>

                    <div className="button-bottom-top"><a onClick={()=>{
                        // this.props.history.goBack();
                    }}> 이미 계정이 있으신가요? </a> </div>
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