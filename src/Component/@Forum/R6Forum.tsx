import React from "react";
import ForumReactor, { ForumState, ForumStateInitialState, ForumAction } from "./ForumReactor";
import R6CommunityNavigation from "../Contents/TopicNavigation/R6CommunityNavigation";
import ReactorGroup from "../../ReactorKit/ReactorGroup";
import styled from "styled-components";
import { R6List } from "../Contents";
import { R6StatAPI } from "../../Library/R6StatAPI";
import R6ListFooter from "../Contents/ListFooter/R6ListFooter";
import R6IDSearch from "../Contents/Post/Edit/R6IDSearch/R6IDSearch";
import R6Post from "../Contents/Post/View/R6Post";
import R6QuickSearch from "../QuickSearch/R6QuickSearch";
import R6PostWrite from "../Contents/Post/Edit/R6PostWrite";
import { map, distinctUntilChanged, observeOn, tap } from "rxjs/operators";
import { deepDistinctUntilChanged } from "../../Library/RxJsExtension";
import { ReactorControlType } from "../../ReactorKit/Reactor";
import { Subject, queueScheduler } from "rxjs";



const FROUMMARGIN = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    margin-top:90px;
    padding: 0 1rem;
`

export class R6Forum extends React.Component{
    
    reactor?: ForumReactor | undefined;
    reactorControls?: ReactorControlType<ForumAction, ForumState>;
    initialState?: ForumState


    componentWillMount(){
        this.reactor = new ForumReactor(ForumStateInitialState)
        this.reactorControls = this.reactor.getReactorControl();
    }

    componentDidMount(){

        this.reactor?.dispatch({type:"CLICKTOPIC", newTopic:"tips"});

        this.reactor?.state.pipe(
            map( value => value.mode ),
            deepDistinctUntilChanged(),
        ).subscribe( 
            mode=> this.setState({mode})
        )

    }

    render(){
        //ismodal
        return(
            <React.Fragment>
                <FROUMMARGIN>
                    <ReactorGroup {...this.reactorControls}>
                        <R6CommunityNavigation></R6CommunityNavigation>
                        {
                            this.reactor?.currentState.mode === "list" &&
                                <R6List></R6List>
                        }
                        {
                            this.reactor?.currentState.mode === "list" &&
                                <R6ListFooter></R6ListFooter>
                        }
                        {
                            this.reactor?.currentState.mode === "edit" &&
                                <R6PostWrite></R6PostWrite>
                        }
                        {
                            this.reactor?.currentState.mode === "view" &&
                                <R6Post></R6Post>
                        }


                        {/* <R6IDSearch></R6IDSearch> */}
                        {/* <R6QuickSearch></R6QuickSearch> */}
                        {/* <R6List></R6List> */}
                        {/* <DUMMY></DUMMY> */}
                        </ReactorGroup>
                </FROUMMARGIN>
            </React.Fragment>
        )
    }

}

export default R6Forum;