//edit version
//write version
import React from "react";
import { ForumReactorProps } from "../../../@Forum/ForumReactor";
import styled from "styled-components";
import R6Editor from "./R6Editor";
import {withReactor} from "reactivex-redux";



const FLUIDDIV = styled.div`
    width:100%;
    margin-bottom:10px;
`

class R6PostWrite extends React.PureComponent<ForumReactorProps> {

    render(){
        // return <R6Editor {...this.props} ></R6Editor>
        return null;
    }
}

export default withReactor(R6PostWrite)