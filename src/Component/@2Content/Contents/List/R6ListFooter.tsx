import { Input, Button, Pagination, Icon } from "semantic-ui-react";
import React from "react";
import styled from 'styled-components'
import { ForumReactorProps, ForumReactorProp, ForumState } from "../../../@0ForumReactor/ForumReactor";
import {withReactor} from "reactivex-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";



const BUTTONAREA = styled.div`
    position:relative;
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    // background:red;
    .write-button {
        position:absolute;
        right:0;
    }

    @media ( max-width: 755px ) {

        & {
            display:flex;
            flex-direction:column;
        }

        .write-button {
            margin-top:20px;
            position:static;
            align-self:flex-end;
        }

    }
`


const SEARCHAREA = styled.div`
    // display:flex;
    // justify-content: flex-end;
    // align-items:center;
`


class R6ListFooter extends React.PureComponent<RouteComponentProps & ForumReactorProp>{

    render() {
        return(
            <>
                <BUTTONAREA>
                    {/* <Pagination className="pagenation" defaultActivePage={1} totalPages={3} /> */}

                    <Pagination
                        activePage={1}
                        boundaryRange={1}
                        // onPageChange={this.handlePaginationChange}
                        size="medium"
                        siblingRange={0}
                        totalPages={20}
                        // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                        ellipsisItem={true}
                    />


                        {/* <Input style={{marginRight:'10px'}} icon='search' placeholder='Search...' /> */}
                    <Button className="write-button" icon color={"green"} size={"big"} onClick={()=>{ 

                        const {isLogined} = this.props.reactor.getState();
                        
                        if (isLogined) {
                            //isLogined but no more access token?
                            let regexp = new RegExp(`\/[a-z]{1,}|\/`);
                            let pathname = this.props.location.pathname;
                            let progressed = regexp.exec(pathname);
                            let excuted = progressed ? progressed[0] : "/null";
    
                            if (excuted === "/") {
                                excuted = "/free"
                            }

                            this.props.history.push(`${excuted}/editor`)

                        } else {
                            this.props.reactor.dispatch({type:"CLICKLOGINBUTTON"})
                        }
                     
                        //if this isLogined false, then we can't do that sorry.
                        //if this isLogined 
                        
                    }}>
                    <Icon name={"edit"}></Icon>

                         글쓰기 </Button>
                </BUTTONAREA>
            </>
        );
    }
}

export default withRouter(R6ListFooter);
