import { Form, Button, Header } from "semantic-ui-react";
import React, { Dispatch, SetStateAction } from "react";
import './R6Register.css'
import { motion } from "framer-motion";
//#36393f
//https://gist.github.com/barbiturat/49facf4eeec1e2a5352ff4fa6bbf7286
//https://gist.github.com/barbiturat/49facf4eeec1e2a5352ff4fa6bbf7286
// 김종민님 + 인프런 인터렉티브 웹<div className=""></div>


class R6Register extends React.Component<{stater :Dispatch<SetStateAction<number>>}> {

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
                <Header className="header-center" size={"huge"}> 계정 만들기 </Header>
             
                <Form>
                    <Form.Field>
                    <label>아이디</label>
                    <input placeholder='ID' />
                    </Form.Field>
                    <Form.Field>
                    <label>비밀번호</label>
                    <input placeholder='Password' type={"password"}/>
                    </Form.Field>
                    <Form.Field>
                    <label>인증용 아이디</label>
                    <input placeholder='Email' type={"email"} />
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                </Form>
                <Button type='submit' fluid color={"green"}>계속하기</Button>
                <div className="button-bottom-top"><a onClick={()=>{this.props.stater(0)}}> 이미 계정이 있으신가요? </a> </div>
                <div> 등록하는 순간 R6-Community 서비스의 <a>이용 약관</a>과 <a>개인정보 보호 정책</a>에 동의하게 됩니다. </div>
            </motion.div>

        </div>


        </>
       )
    
    }
}

export default R6Register