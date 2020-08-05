import { Input, Button, Pagination } from "semantic-ui-react";
import React from "react";
import styled from 'styled-components'
import { ForumReactorProps, ForumReactorProp } from "../../../@0ForumReactor/ForumReactor";
import {withReactor} from "reactivex-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";



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


class R6ListFooter extends React.PureComponent<RouteComponentProps>{

    render() {
        return(
            <>
                <BUTTONAREA>
                    <Button basic fluid content='이전' icon='left arrow' labelPosition='left'/>
                    <Button basic fluid content='다음' icon='right arrow' labelPosition='right' />
                </BUTTONAREA>
                <Pagination defaultActivePage={1} totalPages={2} />
                <SEARCHAREA>
                    {/* <Input style={{marginRight:'10px'}} icon='search' placeholder='Search...' /> */}
                    <Button color={"black"} size={"big"} onClick={()=>{ 

                        let regexp = new RegExp(`\/[a-z]{1,}|\/`);
                        let pathname = this.props.location.pathname;
                        let progressed = regexp.exec(pathname);
                        let excuted = progressed ? progressed[0] : "/null";

                        if (excuted === "/") {
                            excuted = "/free"
                        }

                        this.props.history.push(`${excuted}/editor`)
                    }}> 글쓰기 </Button>
                </SEARCHAREA>
            </>
        );
    }
}

export default withRouter(R6ListFooter);
