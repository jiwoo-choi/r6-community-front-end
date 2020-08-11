import React from "react";
import styled from "styled-components";
import { Viewer } from '@toast-ui/react-editor'
import { Placeholder, Segment, Header, Divider, Button, Confirm } from "semantic-ui-react";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import './R6Post.css';
import Moment from "react-moment";
import { CommentType } from "../../../../../Util/Entity";
import R6Comment from "./R6Comment";
import R6TextArea from "./R6TextArea";
import { observer, inject } from "mobx-react";
import PostStore from "../../../../Stores/PostStore";
import ForumStore from "../../../../Stores/ForumStore";

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
`


const MODIFYBUTTONAREA = styled.div`
    margin:14px 0px;
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
        this.props.post?.getPost();
    }

    commentList(comment : CommentType[]){
        
        return comment.map( (value, index) => {
            return (
                <R6Comment key={index+"_COMMENT"} comment={value} onSubmit={this.onSubmit.bind(this)}></R6Comment>
              )
        })
    }

    onSubmit(content:string, parentId: number){
        this.props.post!.postComment( content, parentId )
    }

    handleOnClick(){
        if (!this.props.forum!.isLogined) {
            this.props.forum!.openLoginModal(true);
        } else {
            this.props.post!.postComment((this.commentInput as any).current.value)
        }
    } 

    handleCancel(){
        this.props.post!.setConfirmOpen(false);
    }
    handleOpen(){
        this.props.post!.setConfirmOpen(true);
    }
    handleConfirm(){
        this.props.post?.delete();        
    }
    /**
     * 
                <Comment key={"COMMENT_" + index}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                  <Comment.Author as='a'>{value.username}</Comment.Author>
                  <Comment.Metadata>
                  <Moment fromNow>{value.createdTime}</Moment>
                  </Comment.Metadata>
                  <Comment.Text>{value.content}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
     */
    render(){
        const { postContent, isLoading, isCommentLoading, isConfirmOpened, countOfComments} = this.props.post!;
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
            const { author, title, content, commentList, createdTime, postId} = postContent!
            return (
                <>
                
                <Confirm
                    open={isConfirmOpened}
                    content='삭제하시겠습니까?'
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleConfirm.bind(this)}
                />

                    <POSTAREA key={postId + "_KEY"}>
                        <Header size={'huge'}>{title}</Header>
                        <SUBTITLEAREA>
                            <AUTHOR>{author}</AUTHOR>
                            <TIME><Moment fromNow>{createdTime}</Moment></TIME>
                        </SUBTITLEAREA>
                        {
                            nickName === author && 
                            <MODIFYBUTTONAREA>
                                <Button inverted color={"red"} onClick={this.handleOpen.bind(this)}> 삭제 </Button>
                                <Button inverted color={"green"}> 수정 </Button>
                            </MODIFYBUTTONAREA>
                        }

                        <Divider />

                        <VIEWERAREA>
                            <Viewer initialValue={content}/>
                        </VIEWERAREA>

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
                        
                        <React.Fragment>
                            {/* <R6Comment comment={commentsReactorList}></R6Comment> */}
                            { this.commentList(commentList) }
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
