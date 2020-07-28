//edit version
//write version
import React from "react";
import ForumReactor, { ForumState, ForumReactorProps } from "../../../@Forum/ForumReactor";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
import R6Editor from "./R6Editor";
import R6IDSearch from "./R6IDSearch/R6IDSearch";
import ReactorGroup from "../../../../ReactorKit/ReactorGroup";
import R6EditorReactor, { EditorinitialState } from "./R6EditorReactor";
import withReactor from "../../../../ReactorKit/withReactor";



const FLUIDDIV = styled.div`
    width:100%;
    margin-bottom:10px;
`

class R6PostWrite extends React.PureComponent<ForumReactorProps> {

    render(){
        return <R6Editor {...this.props} ></R6Editor>
    }
}

export default withReactor(R6PostWrite)