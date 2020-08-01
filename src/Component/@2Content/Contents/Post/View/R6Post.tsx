import React from "react";
import ForumReactor, { ForumState, ForumReactorProps } from "../../../../@0ForumReactor/ForumReactor";
import styled from "styled-components";
import { Viewer } from '@toast-ui/react-editor'
import { withReactor } from 'reactivex-redux'
import { Placeholder, Segment, Image, Header, Divider, Comment, Form, Button } from "semantic-ui-react";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import './R6Post.css';
import Moment from "react-moment";
import { CommentType } from "../../../../../Util/Entity";
import PostReactor, { PostInitialState, PostState } from "./R6PostReactor";
import { skip, distinctUntilChanged } from "rxjs/operators";
import _ from "lodash";

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


//goback...
class R6Post extends React.PureComponent<ForumReactorProps, PostState> {

    dispatcher = this.props.reactor_control.dispatcher;

    reactor?: PostReactor|null;

    constructor(props:any) {
        super(props)
        this.state = PostInitialState;
    }
    componentDidMount() {

        this.reactor = new PostReactor(PostInitialState);

        this.reactor.state.pipe(
            distinctUntilChanged(_.isEqual),
            skip(1)
        ).subscribe( res => this.setState({...res}))


    }

    componentWillUnmount(){
        this.reactor?.disposeAll()
        this.reactor = null;
    }

    commentList(comment : CommentType[]){
        return comment.map( (value, index) => {
            return (

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
              )
        })
    }

    render(){
        const { post, isLoading } = this.props.reactor_control.getState();

        if (isLoading) {
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
            //post!
            const { author, title, content, commentList, createdTime , postId } = post!
            return (
                <>
                    <POSTAREA>
                        <Header size={'huge'}>{title}</Header>
                        <SUBTITLEAREA>
                            <AUTHOR>{author}</AUTHOR>
                            <TIME><Moment fromNow>{createdTime}</Moment></TIME>
                        </SUBTITLEAREA>
                        <Divider />

                        <VIEWERAREA>
                            <Viewer initialValue={content}/>
                        </VIEWERAREA>

                        <Header as='h2' dividing>
                            덧글 {commentList.length} 개
                        </Header>

                        <Form reply>
                            <Form.TextArea />
                            <Button content='덧글 달기' labelPosition='left' icon='edit' color={"green"} onClick={()=>{this.reactor?.dispatch({type:"REPLY", postId: postId, content:"abc"})}}/>
                        </Form>

                        <Comment.Group>
                            { this.state.commentsList.length !== 0 ? this.commentList(this.state.commentsList) : this.commentList(commentList) }
                        </Comment.Group>

                    </POSTAREA>

                </>
            )
        }
    }
}

export default withReactor(R6Post)
/**
 *     
 */