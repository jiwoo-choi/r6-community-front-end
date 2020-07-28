import React from "react";
import ForumReactor, { ForumState } from "../../../@Forum/ForumReactor";
import styled from "styled-components";


const POSTAREA = styled.div`
    
`

export class R6Comment extends React.PureComponent<{
    reactor?: ForumReactor
    initialState?: ForumState
}, ForumState> {


    render(){
        return (
            <div>ㅁㅇㄹㅁㅇㄴㄹ</div>
        )
    }
}