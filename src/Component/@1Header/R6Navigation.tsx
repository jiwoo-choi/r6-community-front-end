import React from "react";
import styled from 'styled-components'
import { Button } from "semantic-ui-react";
import { withReactor } from "reactivex-redux";
import { ForumReactorProps, Topic, ForumReactorProp, ForumState } from "../@0ForumReactor/ForumReactor";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { R6Button, R6ButtonGroup } from './R6Button'
import { map, distinctUntilChanged, skip } from "rxjs/operators";

const NAVIGATIONSTYLE = styled.nav`
    max-width:1200px;
    height:70px;
`

const GLOBALNAV = styled.nav`
	position: relative;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 70px;
`

const NAVITEMS = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;

`

const BRANDLOGO = styled.a`
    font-family: 'Anton', sans-serif;
    font-size: 2.8rem;
    color:black;
    cursor: pointer;
    text-decoration: unset;
    margin-right:auto;

    &:hover {
        color: black;
    }

    @media only screen and (max-width: 380px) {
      & {
        font-size: 1.5rem;
        }

        & button {
            font-size: 3.0rem;
        }
    }

    @media only screen and (max-width: 600px) {

      & {
        font-size: 2.0rem;
      }

        & button {
            font-size: 1.5rem;
        }

    }
`

const SUBNAVITEMS = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 5rem;
  padding-left: 1rem;

  @media only screen and (max-width: 600px) {

    & {
        padding-top: 3rem;
    }
  }
`

class R6Navigation extends React.Component<ForumReactorProp & RouteComponentProps, ForumState> {
    

    constructor(props: any) {
        super(props);
        this.state = this.props.reactor.getState();

    }

    handleToggle(value : Topic, url?: string){
        this.props.reactor.dispatch({type:"SETTOPIC", newTopic: value})
        if (url) {
            this.props.history.push(`${url}`)
        } else {
            this.props.history.push(`/${value}`)
        }
    }

    componentDidMount(){
        this.props.reactor.state.pipe(
            map( res => res.topic),
            distinctUntilChanged(),
            skip(1),
        ).subscribe(
            topic => this.setState({topic})
        )

        this.props.reactor.state.pipe(
            map( res => res.isLogined),
            distinctUntilChanged(),
            skip(1),
        ).subscribe(
            isLogined => this.setState({isLogined})
        )

        this.props.reactor.state.pipe(
            map( res => res.nickName),
            distinctUntilChanged(),
            skip(1),
        ).subscribe(
            nickName => this.setState({nickName})
        )

    }

    render(){

        const { topic, isLogined } = this.state;

        return(
            <React.Fragment>
                <GLOBALNAV>
                    <NAVITEMS>
                        <BRANDLOGO onClick={()=>{this.handleToggle("free", "/")}}> R6 Search - TALK </BRANDLOGO>
                        { !isLogined ? 
                            (<Button secondary compact onClick={this.props.reactor.dispatchFn({type:"CLICKLOGINBUTTON"})}>로그인하기</Button>) :
                            (<div> {this.state.nickName}님 안녕하세요! </div>)
                        }
                    </NAVITEMS>
                </GLOBALNAV>

                <SUBNAVITEMS>
                        <R6ButtonGroup onChange={this.handleToggle.bind(this)} currentValue={topic}>
                            <R6Button value={"free"}> 자유게시판 </R6Button>
                            <R6Button value={"tips"}> 공략/팁 </R6Button>
                            <R6Button value={"together"}> 같이해요 </R6Button>
                            <R6Button value={"clan"}> 클랜모집 </R6Button>
                        </R6ButtonGroup>
                </SUBNAVITEMS>
            </React.Fragment>
        )
    }
}

export default withRouter(R6Navigation);