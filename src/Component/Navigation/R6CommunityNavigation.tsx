import React from "react";
import styled from 'styled-components'
import { Button, Menu, Icon } from "semantic-ui-react";
import ForumReactor, { Topic, ForumState } from "../@Forum/ForumReactor";
import { map, tap } from "rxjs/operators";
import { deepDistinctUntilChanged } from "../../Library/RxJsExtension";


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


export default class R6CommunityNavigation extends React.PureComponent<{
    reactor?: ForumReactor
    initialState?: ForumState
}, ForumState> {

    constructor(props: {
        reactor?: ForumReactor
        initialState?: ForumState
    }) {
        super(props);
        this.state = this.props.initialState!;
        //첫 섭스크라이브하면 받아준다. 첫섭스크라이브 최초설정을보내주긴한다.
        //replay언제든지?
        //this.state;;
        //Forum..??.! omg..
    }

    componentDidMount(){
        this.props.reactor?.state.pipe(
            map( res => res.topic ),
            deepDistinctUntilChanged(),
        ).subscribe(
            topic => this.setState({topic})
        )
    }

    render(){
        return(
                <Menu compact pointing secondary>
                    <Menu.Item  
                        active={this.state.topic === "tips"}
                        onClick={()=>{this.props.reactor?.action.next({type:"CLICKTOPIC", newTopic:"tips"})}}
                    >
                    <Icon name='gamepad' disabled={this.state.topic !== "tips"} />
                    공략/팁 게시판
                    </Menu.Item>
                    <Menu.Item  
                        active={this.state.topic === "clan"}
                        onClick={()=>{this.props.reactor?.action.next({type:"CLICKTOPIC", newTopic:"clan"})}}
                    >
                    <Icon name='signup' disabled={this.state.topic !== "clan"} />
                    클랜 정보 게시판
                    </Menu.Item>
                    <Menu.Item
                        active={this.state.topic === "together"}
                        onClick={()=>{this.props.reactor?.action.next({type:"CLICKTOPIC", newTopic:"together"})}}
                    >
                    <Icon name='users' disabled={this.state.topic !== "together"}/>
                    같이하기
                    </Menu.Item>
                    <Menu.Item
                        active={this.state.topic === "free"}
                        onClick={()=>{this.props.reactor?.action.next({type:"CLICKTOPIC", newTopic:"free"})}}
                    >
                    <Icon name='list alternate' disabled={this.state.topic !== "free"} />
                    자유게시판
                    </Menu.Item>
            </Menu>
        )
    }
}