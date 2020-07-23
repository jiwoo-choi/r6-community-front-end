import React from "react";
import ForumReactor, { ForumState } from "./ForumReactor";
import R6CommunityNavigation from "../Navigation/R6CommunityNavigation";
import ReactorGroup from "../../ReactorKit/ReactorGroup";
import styled from "styled-components";
import { R6List } from "../Contents";



const FROUMMARGIN = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    margin-top:90px;
    padding: 0 1rem;
`

const DUMMY = styled.div`
    height:100px;
    background:black;
    width:200px;
`

export class R6Forum extends React.Component {
    
    reactor?: ForumReactor | undefined;
    initialState?: ForumState

    componentWillMount(){

        this.initialState = {
            isError: false,
            isLoading: false,
            page: 1,
            mode:"list",
            topic:"clan",
            post: undefined,
            list:[],
        }

        this.reactor = new ForumReactor(this.initialState)
    }
    

    render(){
        return(
            <React.Fragment>
                <FROUMMARGIN>
                <ReactorGroup reactor={this.reactor} initialState={this.initialState}>
                    <R6CommunityNavigation></R6CommunityNavigation>
                    <R6List></R6List>
                    {/* <R6List></R6List> */}
                    {/* <DUMMY></DUMMY> */}
                </ReactorGroup>
                </FROUMMARGIN>
            </React.Fragment>
        )
    }

}

export default R6Forum;