import React, { useState } from 'react';
import './App.css';
import R6IDSearchStore from './Component/IDSearch/R6IDSearchStore';
import {R6Navigation} from './Component';
import { Button, Header } from 'semantic-ui-react';
import styled from 'styled-components'
import GlobalNavigation from './Component/Navigation/R6GlobalNavigation'
import CommunityNavigation from './Component/Navigation/R6CommunityNavigation';
import R6Table from './Component/List/R6Table';
import { Pagination } from 'semantic-ui-react'
import R6Login from './Component/Modal/R6Login';
import { ModalReactor } from './Component/Modal/ModalReactor';
import { Reactor } from './ReactorKit/Reactor';
import {GlobalReactor, register } from './ReactorKit/GlobalStore';
// import { ModalReactor } from './Component/Modal/ModalReactor';
import { ContentReactor } from './Component/Contents/ContentReactor';

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

const value = register([new ModalReactor({isOpened: false},false,true)])

function App() {

  // const EditorStore = new R6EditorStore();
  // 사용하는 모든 Prop를 받도록한다.
  // console.log(Object.getOwnPropertyDescriptors(new R6Table({}x))
//    <GlobalReactor value={value}>

  return(
      <div className="App">
        <GlobalReactor.Provider value={value}>
        <R6Table></R6Table>
        {/* <R6Editor store={store}></R6Editor> */}
        {/* <R6Comment comments={commentMockup}></R6Comment> */}
        {/* <R6List></R6List> */}
        {/* <GLOBALNAV>
          <NAVLINKTS>
            <IMAGE src="./logo.png"></IMAGE>
            <ABC> <Header>R6-Search 커뮤니티</Header> </ABC>
            <Button >로그인하기</Button>
            <Button >회원가입하기</Button>
          </NAVLINKTS>
        </GLOBALNAV>
        <CONTAINER>
          <R6Navigation></R6Navigation>
        </CONTAINER> */}
        {/* <GlobalNavigation></GlobalNavigation>
        <CommunityNavigation></CommunityNavigation>
        <R6Table></R6Table>
       <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
      /> */}
      {/* <R6Login></R6Login> */}
      </GlobalReactor.Provider>
      </div>
    );

}

export default App;