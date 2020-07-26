import React from "react";
import ForumReactor, { ForumState } from "../../../@Forum/ForumReactor";
import styled from "styled-components";
import { Input } from "semantic-ui-react";


const POSTAREA = styled.div`
    
`
//goback...
export default class R6Post extends React.PureComponent<{
    reactor?: ForumReactor
    initialState?: ForumState
}, ForumState> {


    render(){
        return (
            <div>
            </div>
        )
    }
}