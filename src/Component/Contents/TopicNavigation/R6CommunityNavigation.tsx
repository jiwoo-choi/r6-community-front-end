import React from "react";
import styled from 'styled-components'
import {  Menu, Icon } from "semantic-ui-react";
import ForumReactor, {  ForumState } from "../../@Forum/ForumReactor";
import { map } from "rxjs/operators";
import { deepDistinctUntilChanged } from "../../../Library/RxJsExtension";
import ReactiveView from "../../../ReactorKit/ReactiveView";


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




class R6CommunityNavigation extends React.PureComponent<{
    reactor?: ForumReactor
}> {

    // constructor(props: {
    //     reactor?: ForumReactor
    // }) {
    //     super(props);
    //     this.state = this.props.reactor?.currentState!;
    // }

    componentDidMount(){
        // this.props.reactor?.state.pipe(
        //     map( res => res.topic ),
        //     deepDistinctUntilChanged(),
        // ).subscribe(
        //     topic => this.setState({topic})
        // )
    }

    render() {
        if (!this.props.reactor){
            return null
        } else {

            const reactor = this.props.reactor
            const { topic } = reactor.currentState;

            return(
                <div style={{marginBottom:'20px'}}>
                    <Menu size={"large"} compact pointing secondary>
                        <Menu.Item  
                            active={topic === "tips"}
                            onClick={()=>{reactor.dispatch({type:"CLICKTOPIC", newTopic:"tips"})}}
                        >
                        <Icon name='gamepad' disabled={topic !== "tips"} />
                        공략/팁 게시판
                        </Menu.Item>
                        <Menu.Item  
                            active={topic === "clan"}
                            onClick={()=>{reactor.dispatch({type:"CLICKTOPIC", newTopic:"clan"})}}
                        >
                        <Icon name='signup' disabled={topic !== "clan"} />
                        클랜 정보 게시판
                        </Menu.Item>
                        <Menu.Item
                            active={topic === "together"}
                            onClick={()=>{reactor.dispatch({type:"CLICKTOPIC", newTopic:"together"})}}
                        >
                        <Icon name='users' disabled={topic !== "together"}/>
                        같이하기
                        </Menu.Item>
                        <Menu.Item
                            active={topic === "free"}
                            onClick={()=>{reactor.dispatch({type:"CLICKTOPIC", newTopic:"free"})}}
                        >
                        <Icon name='list alternate' disabled={topic !== "free"} />
                        자유게시판
                        </Menu.Item>
                    </Menu>
                </div>
            )
        }

    }
}

export default ReactiveView(R6CommunityNavigation)