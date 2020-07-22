import React from "react";
import styled from 'styled-components'
import { Button, Menu, Icon } from "semantic-ui-react";


const NAVITEMS = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  
`

const BRANDLOGO = styled.a`
    font-family: 'Shadows Into Light', cursive;
    font-size: 3rem;
    font-weight:bold;
    color:black;
    cursor: pointer;
    text-decoration: unset;
    margin-right:auto;

    &:hover {
        color: black;
    }
  
`

const COMMUNITYNAVIGATIONWRAPPER = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    margin-top:30px;
`


export default class CommunityNavigation extends React.Component {

    render(){
        return(
            <COMMUNITYNAVIGATIONWRAPPER>
                <Menu compact pointing secondary>
                    <Menu.Item
                    active={true}
                    name='home'
                    >
                    <Icon name='browser' />
                    전체
                    </Menu.Item>
                    <Menu.Item
                    name='home'
                    >
                    <Icon name='gamepad' disabled />
                    공략/팁 게시판
                    </Menu.Item>
                    <Menu.Item
                    name='home'
                    >
                    <Icon name='signup' disabled />
                    클랜 정보 게시판
                    </Menu.Item>
                    <Menu.Item
                    name='home'
                    >
                    <Icon name='users' disabled/>
                    같이하기
                    </Menu.Item>
                    <Menu.Item
                    name='home'
                    >
                    <Icon name='list alternate'disabled />
                    자유게시판
                    </Menu.Item>
                    
            </Menu>
          </COMMUNITYNAVIGATIONWRAPPER>
        )
    }
}