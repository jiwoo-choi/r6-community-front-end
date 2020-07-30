import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components'
// import { ModalReactor } from './Component/Modal/ModalReactor';
import { 
  R6Forum, 
  R6Navigation, 
  R6Footer
} from './Component';
import R6Register from './Component/Login/R6Register';
import R6Login from './Component/Login/R6Login';
import ForumReactor, { ForumStateInitialState } from './Component/@Forum/ForumReactor';
import { deepDistinctUntilChanged } from './Library/RxJsExtension';
import { map, filter, pluck } from 'rxjs/operators';
import { reduce } from 'lodash';
import Provider from './ReactorKit/Provider';

const PADDING = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const GLOBALNAV = styled.nav`
	position: relative;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 60px;
  padding: 0 1rem;
  border-bottom: 1px solid #ddd;
`

const NAVLINKTS = styled.nav`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  
`
const ABC = styled.div`
	margin-right: auto;
	font-size: 1.4rem;
  font-weight: bold;
`
const IMAGE = styled.img`
  width:35px;
  height:35px;
  margin-right:10px;
`

const CONTAINER = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-size: 1.2rem;
  color: #888;
`
//  // padding: 0 1rem;
// 항상 살아있어야하는 store입니다.
// 앱이 꺼지기 전까지는요. 글로벌 스토어
// const value = register([new ModalReactor({isOpened: false},false,true)])

const SECTIONWRAPPER = styled.div`
  min-height:90vh;
`

function App() {
  const [loginState, loginSetter] = useState(0);
  const [registerState, registerSetter] = useState(0);

  return(
      <div className="App">
        {/* <R6Navigation></R6Navigation>
            <SECTIONWRAPPER>
              <R6Forum></R6Forum>
            </SECTIONWRAPPER>
            <R6Login stater={registerSetter}></R6Login>
          <R6Footer></R6Footer> */}
          {/* <R6Login loginStater={loginSetter} stater={registerSetter}></R6Login> */}
          {/* <R6Register stater={registerSetter}></R6Register> */}
          {/* <R6Confirmation></R6Confirmation> */}
          {/* <R6Confirmation></R6Confirmation> */}
        { registerState === 0 && 
          <>
            <R6Navigation stater={loginSetter}></R6Navigation>
            <SECTIONWRAPPER>
              <R6Forum></R6Forum>
            </SECTIONWRAPPER>
            { loginState && 
              <R6Login loginStater={loginSetter} stater={registerSetter}></R6Login>
            } 
            <R6Footer></R6Footer>
          </>
        } 
        { registerState === 1 &&
          <R6Register stater={registerSetter}></R6Register>
        }
      
      </div>
    );

}


export default App;
