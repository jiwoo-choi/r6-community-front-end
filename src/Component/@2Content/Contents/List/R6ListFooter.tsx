import { Input, Button, Pagination, Icon, PaginationProps } from "semantic-ui-react";
import React from "react";
import styled from 'styled-components'
import { ForumReactorProps, ForumReactorProp, ForumState } from "../../../@0ForumReactor/ForumReactor";
import {withReactor} from "reactivex-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { lte } from "lodash";
import { observer, inject } from "mobx-react";
import ForumStore from "../../../Stores/ForumStore";



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


interface Props {
    forum?: ForumStore; 
}

@inject('forum')
@observer
class R6ListFooter extends React.PureComponent<Props>{

    handlePaginationChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: PaginationProps){

        if (data.activePage) {
            let activePage: number; 
            
            if (typeof data.activePage === "string") {
                activePage = parseInt(data.activePage);
            } else {
                activePage = data.activePage
            }
            this.props.forum!.getList(undefined, activePage);
        }


    }

    handleOnClick() {
        this.props.forum!.goEditor();

        // const isLogined = this.props.forum!.isLogined;

        // if (isLogined) {
        //     // let regexp = new RegExp(`\/[a-z]{1,}|\/`);
        //     // let pathname = this.props.location.pathname;
        //     // let progressed = regexp.exec(pathname);
        //     // let excuted = progressed ? progressed[0] : "/null";
        // } else {

        // }

                                        // if (isLogined) {
                        //     //isLogined but no more access token?
                        //     let regexp = new RegExp(`\/[a-z]{1,}|\/`);
                        //     let pathname = this.props.location.pathname;
                        //     let progressed = regexp.exec(pathname);
                        //     let excuted = progressed ? progressed[0] : "/null";
    
                        //     if (excuted === "/") {
                        //         excuted = "/free"
                        //     }

                        //     this.props.history.push(`${excuted}/editor`)

    }

    render() {
        const { page, isLogined, meta } = this.props.forum!;

        return(
            <>
                <BUTTONAREA>

                    <Pagination
                        activePage={page}
                        boundaryRange={1}
                        onPageChange={this.handlePaginationChange.bind(this)}
                        size="mini"
                        siblingRange={0}
                        totalPages={meta.totalPage}
                    />

                    {/* <Input style={{marginRight:'10px'}} icon='search' placeholder='Search...' /> */}
                    <Button className="write-button" icon color={"green"} size={"big"} onClick={this.handleOnClick.bind(this)}>
                    <Icon name={"edit"}></Icon>
                         &nbsp; 글쓰기 </Button>
                </BUTTONAREA>
            </>
        );
    }
}

export default R6ListFooter;
