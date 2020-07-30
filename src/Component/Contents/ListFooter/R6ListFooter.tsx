import { Input, Button } from "semantic-ui-react";
import React from "react";
import styled from 'styled-components'
import ForumReactor, { ForumState, ForumReactorProps } from "../../@Forum/ForumReactor";
import {withReactor} from "reactivex-redux";



const BUTTONAREA = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    height:45px;
    margin-bottom:10px;
`


const SEARCHAREA = styled.div`
    display:flex;
    justify-content: flex-end;
    align-items:center;
    height:45px;
    margin-bottom:10px;
`


class R6ListFooter extends React.PureComponent<ForumReactorProps>{

    dispatcher = this.props.reactor_control.dispatcher

    render() {
        return(
            <>
                <BUTTONAREA>
                    <Button basic fluid content='이전' icon='left arrow' labelPosition='left'/>
                    <Button basic fluid content='다음' icon='right arrow' labelPosition='right' />
                </BUTTONAREA>
                <SEARCHAREA>
                    <Input style={{marginRight:'10px'}} icon='search' placeholder='Search...' />
                    <Button color={"black"} onClick={this.dispatcher({type:"CLICKWRITE"})}> 글쓰기 </Button>
                </SEARCHAREA>
            </>
        );
    }
}

export default withReactor(R6ListFooter, (state) => ({mode: state.mode}));
