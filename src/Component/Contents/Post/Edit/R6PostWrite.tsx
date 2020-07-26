//edit version
//write version
import React from "react";
import ForumReactor, { ForumState } from "../../../@Forum/ForumReactor";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
import R6Editor from "./R6Editor";
import R6IDSearch from "./R6IDSearch/R6IDSearch";
import ReactorGroup from "../../../../ReactorKit/ReactorGroup";
import R6EditorReactor, { EditorinitialState } from "./R6EditorReactor";
import ReactiveView from "../../../../ReactorKit/ReactiveView";



const FLUIDDIV = styled.div`
    width:100%;
    margin-bottom:10px;
`

class R6PostWrite extends React.PureComponent<{
    reactor?: ForumReactor
}> {

    render(){
        if (!this.props.reactor) {
            return null
        } else {
            const reactor = this.props.reactor;
                return <R6Editor reactor={reactor}></R6Editor>
            }
    }
}

export default ReactiveView(R6PostWrite)