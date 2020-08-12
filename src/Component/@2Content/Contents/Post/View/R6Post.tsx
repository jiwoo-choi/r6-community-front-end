import React from "react";
import styled from "styled-components";
import { Viewer } from '@toast-ui/react-editor'
import { Placeholder, Segment, Header, Divider, Button, Confirm, Icon } from "semantic-ui-react";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import './R6Post.css';
import Moment from "react-moment";
import { CommentType } from "../../../../../Util/Entity";
import R6Comment from "./R6Comment";
import R6TextArea from "./R6TextArea";
import { observer, inject } from "mobx-react";
import PostStore from "../../../../Stores/PostStore";
import ForumStore from "../../../../Stores/ForumStore";
import R6CommentGroup from "./R6CommentGroup";
import _ from 'lodash'
import { R6Loading } from "../../../../@Reusable-Component";
import { toJS } from "mobx";

const POSTAREA = styled.div`
    position: relative;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    margin: 1rem 0;
    padding: 2em 2em;
    border-radius: .28571429rem;
    border: 1px solid rgba(34,36,38,.15);
`

const VIEWERAREA = styled.div`
    min-height:400px;
    overflow-y:hidden;
    word-break:break-all;
`

const SUBTITLEAREA = styled.div`
    display:flex;
    flex-direction:row;
    font-size:1.1rem;
`

const AUTHOR = styled.div`
    font-weight:bold;
    margin-right:0.8em;

`

const TIME = styled.div`
    font-size:1rem;
    color:#A9A9A9;
`

const BUTTONAREA = styled.div`
    display:flex;
    justify-content: flex-end;
    margin-bottom:10px;
`

const MODIFYBUTTONAREA = styled.div`
    margin:14px 0px;
`

const THUMBSUPBUTTONAREA = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    justify-content:center;

    button:nth-child(1) {
        margin-right:10px !important;
        width:90px;
    }
    button:nth-child(2) {
        margin-left:10px !important;
        margin-right:0px !important;
        width:90px;
    }

`


interface Props {
    post?: PostStore;
    forum?: ForumStore;
}

@inject(({post, forum}) => ({ forum : forum, post: post}))
@observer
class R6Post extends React.PureComponent<Props> {

    commentInput = React.createRef<HTMLTextAreaElement>();

    componentDidMount() {
        // window.scrollTo(0,0);
        this.props.post?.getPost();
    }

    getCommentList(comment: CommentType[]){

        return(
            <R6CommentGroup>
                {          
                    comment.map( (value, index) => {
                        return (
                            <R6Comment key={index+"_COMMENT"} comment={value} onSubmit={this.onSubmit.bind(this)}></R6Comment>
                        )
                    })
                }
            </R6CommentGroup>
        )
    }

    onSubmit(content:string, parentId?: number){
        this.props.post!.postComment( content, parentId)
    }

    handleOnClick(){
        this.onSubmit((this.commentInput as any).current.value)
        if (this.commentInput.current) {
            this.commentInput.current!.value = ""
        }
    } 

    handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
        if (event.keyCode === 13) {
            this.onSubmit((this.commentInput as any).current.value)
        }
    }
    
    handleCancel(){
        this.props.post!.setConfirmOpen(false);
    }

    handleOpen(){
        this.props.post!.setConfirmOpen(true);
    }

    handleDelete(){
        this.props.post?.delete();        
    }

    render(){
        const { postContent, isLoading, isCommentLoading, isConfirmOpened, countOfComments, flattenCommentList} = this.props.post!;
        const { nickName } = this.props.forum!;

        if ( isLoading || !postContent ) {
            return (
                <Segment loading>
                    <Placeholder>
                        <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                 </Segment>
            
            )
        } else {
            const { author, title, content, createdTime, postId} = postContent!
            return (
                <>
                
                <Confirm
                    open={isConfirmOpened}
                    content='삭제하시겠습니까?'
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleDelete.bind(this)}
                />

                    <POSTAREA key={postId + "_KEY"}>
                        <Header size={'huge'}>{title}</Header>
                        <SUBTITLEAREA>
                            <AUTHOR>{author}</AUTHOR>
                            <TIME><Moment local locale="ko" fromNow>{createdTime}</Moment></TIME>
                        </SUBTITLEAREA>
                        {
                            nickName === author && 
                            <MODIFYBUTTONAREA>
                                <Button basic color={"red"} onClick={this.handleOpen.bind(this)}> 삭제 </Button>
                                <Button basic color={"green"}> 수정 </Button>
                            </MODIFYBUTTONAREA>
                        }
                        <Divider />
                        <VIEWERAREA>
                            <Viewer initialValue={content}/>
                        </VIEWERAREA>
                        
                        <React.Fragment>
                            <THUMBSUPBUTTONAREA>
                                <Button icon basic color={"green"}>
                                    <Icon name={"thumbs up outline"} ></Icon>
                                    추천
                                </Button>

                                <Button icon basic color={"red"}>
                                    <Icon name={"thumbs down outline"}></Icon>
                                    비추천
                                </Button>
                            </THUMBSUPBUTTONAREA>
                        </React.Fragment>


                        <Header key={"MY_KEY"} as='h2' dividing>
                            덧글 { countOfComments } 개
                        </Header>

                        <R6TextArea placeholder='덧글을 입력해주세요' textRef={ (ref) => this.commentInput = ref }/>
                        <BUTTONAREA>
                            <Button 
                                content='덧글 달기'
                                labelPosition='left'
                                icon='edit'
                                color={"green"}
                                disabled={isCommentLoading}
                                loading={isCommentLoading}
                                onClick={this.handleOnClick.bind(this)}/>
                        </BUTTONAREA>

                        {/* <Form>
                            <R6TextArea placeholder='Tell us more' ref={ (ref) => this.commentInput = ref }/>
                            <BUTTONAREA>
                            <Button 
                                content='덧글 달기'
                                labelPosition='left'
                                icon='edit'
                                color={"green"}
                                disabled={this.state.commentIsLoading}
                                loading={this.state.commentIsLoading}
                                onClick={()=>{
                                    
                                    const {isLogined} = this.props.reactor.getState();
                                    if (isLogined) {
                                        this.reactor?.dispatch({type:"CLICKREPLY", postId: postId, content:(this.commentInput as any).current.ref.current.value})
                                    } else {
                                        this.props.reactor.dispatch({type:"CLICKLOGINBUTTON"})
                                    }
                                    
                                    }}/>
                            </BUTTONAREA>
                        </Form> */}
                        {/*pencil delete */}

                        <React.Fragment>
                            {/* <R6Comment comment={commentsReactorList}></R6Comment> */}
                            { 
                                isCommentLoading ?
                                <R6Loading/> :
                                this.getCommentList(flattenCommentList)
                            }
                            {/* <Comment.Group>
                                { commentsReactorList.length !== 0 ? this.commentList(commentsReactorList) : this.commentList(commentList) }
                            </Comment.Group> */}
                        </React.Fragment>
                    </POSTAREA>

                </>
            )
            
        }        
    }
}

export default R6Post
