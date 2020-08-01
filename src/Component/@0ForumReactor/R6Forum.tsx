import React from "react";
import ForumReactor, { ForumState, ForumStateInitialState, ForumAction } from "./ForumReactor";
import { deepDistinctUntilChanged, ReactorControlType } from "reactivex-redux";
import styled from "styled-components";
import { map } from "rxjs/operators";

const FROUMMARGIN = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    margin-top:90px;
    padding: 0 1rem;
`

export class R6Forum extends React.Component {
    
    reactor?: ForumReactor | undefined;
    reactorControls?: ReactorControlType<ForumAction, ForumState>;
    initialState?: ForumState

    componentWillMount(){
        this.reactor = new ForumReactor(ForumStateInitialState)
        this.reactorControls = this.reactor.getReactorControl();
    }

    componentDidMount(){

        this.reactor?.dispatch({type:"CLICKTOPIC", newTopic:"tips"});
        this.reactor!.disposedBy = this.reactor?.state.pipe(
            map( value => value.mode ),
            deepDistinctUntilChanged(),
        ).subscribe( 
            mode=> this.setState({mode})
        )
    }

    componentWillUnmount(){
        this.reactor?.disposeAll();
    }

    render(){
        return(
            <React.Fragment>
                <FROUMMARGIN>
                        {/* <R6CommunityNavigation reactor_control={this.reactorControls!}></R6CommunityNavigation> */}
                        {/* {
                            this.reactor?.currentState.mode === "list" &&
                                <R6List reactor_control={this.reactorControls!}></R6List>
                        }
                        {
                            this.reactor?.currentState.mode === "list" &&
                                <R6ListFooter reactor_control={this.reactorControls!}></R6ListFooter>
                        }
                        {
                            this.reactor?.currentState.mode === "edit" &&
                                <R6PostWrite reactor_control={this.reactorControls!}></R6PostWrite>
                        }
                        {
                            this.reactor?.currentState.mode === "view" &&
                                <R6Post reactor_control={this.reactorControls!}></R6Post>
                        } */}
                </FROUMMARGIN>
            </React.Fragment>
        )
    }

}

export default R6Forum;