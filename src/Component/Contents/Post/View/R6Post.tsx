import React from "react";
import ForumReactor, { ForumState } from "../../../@Forum/ForumReactor";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
// import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { Viewer } from '@toast-ui/react-editor'


const POSTAREA = styled.div`
    
`
//goback...
export default class R6Post extends React.PureComponent<{
    reactor?: ForumReactor
    initialState?: ForumState
}, ForumState> {


    render(){
        return (
            <Viewer initialValue={"<strong>abcd</strong><br><br><br><br><youdoin'tknwoadf>"}/>
        )
    }
}
