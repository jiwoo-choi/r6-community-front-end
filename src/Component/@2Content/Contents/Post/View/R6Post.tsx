import React from "react";
import ForumReactor, { ForumState, ForumReactorProps, ForumReactorProp, ForumStateInitialState } from "../../../../@0ForumReactor/ForumReactor";
import styled from "styled-components";
import { Viewer } from '@toast-ui/react-editor'
import { withReactor, deepDistinctUntilChanged, DisposeBag } from 'reactivex-redux'
import { Placeholder, Segment, Image, Header, Divider, Comment, Form, Button, TextArea } from "semantic-ui-react";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import './R6Post.css';
import Moment from "react-moment";
import { CommentType } from "../../../../../Util/Entity";
import PostReactor, { PostInitialState, PostState } from "./R6PostReactor";
import { skip, distinctUntilChanged, map } from "rxjs/operators";
import _ from "lodash";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { interval } from "rxjs";
import R6Comment from "../../../../@Reusable-Component/R6Comment";
import R6TextArea from "../../../../@Reusable-Component/R6TextArea";

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


//goback...
class R6Post extends React.PureComponent<ForumReactorProp & RouteComponentProps, ForumState & PostState> {

    disposeBag: DisposeBag | null = new DisposeBag();
    reactor : PostReactor;
    commentInput = React.createRef<HTMLTextAreaElement>();

    constructor(props:any) {
        super(props)
        this.reactor = new PostReactor(PostInitialState);
        this.state = { ...this.props.reactor.getState() , ...PostInitialState}
    }

    componentDidMount() {

        this.disposeBag!.disposeOf = this.props.reactor.state.pipe(
            map( res => res.postId ),
            distinctUntilChanged(),
        ).subscribe(
            postId => this.props.reactor.dispatch({type:"CLICKPOST", postId: postId!})
        )

        this.disposeBag!.disposeOf = this.props.reactor.state.pipe(
            map( res => res.isLoading ),
            distinctUntilChanged(),
        ).subscribe(
            isLoading => {
                this.setState({isLoading})
            }
        )

        this.disposeBag!.disposeOf = this.props.reactor.state.pipe(
            map( res => ({ post: res.post})),
            distinctUntilChanged( ( prev, curr) => _.isEqual(prev.post, curr.post)),
        ).subscribe(
            res => this.setState({ post : res.post})
        )        

        this.disposeBag!.disposeOf = this.props.reactor.state.pipe(
            map( res => ({ post: res.post})),
            distinctUntilChanged( ( prev, curr) => _.isEqual(prev.post, curr.post)),
        ).subscribe(
            res => this.setState({ post : res.post})
        )        


        this.disposeBag!.disposeOf = this.reactor.state.pipe( 
            map( res=> res.commentIsLoading ),
            distinctUntilChanged(_.isEqual),
        ).subscribe(
            commentIsLoading => this.setState({ commentIsLoading })
        )

        this.disposeBag!.disposeOf = this.reactor.state.pipe( 
            map( res=> res.commentIsError ),
            distinctUntilChanged(_.isEqual),
        ).subscribe(
            commentIsError => this.setState({ commentIsError })
        )

        this.disposeBag!.disposeOf = this.reactor.state.pipe( 
            map( res=> res.commentsList ),
            distinctUntilChanged(_.isEqual),
        ).subscribe(
            commentsList => this.setState({ commentsList })
        )

    }


    componentWillUnmount(){
        this.disposeBag?.unsubscribe();
        this.disposeBag = null;
    }

    commentList(comment : CommentType[]){
        console.log(comment.map( (value, index) => {
            return (
                <R6Comment key={index+"_COMMENT"} comment={value}></R6Comment>
              )
        }))

        return comment.map( (value, index) => {
            return (
                <R6Comment key={index+"_COMMENT"} comment={value}></R6Comment>
              )
        })
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
    
        // const { author, title, content, commentList, createdTime , postId } = this.state;
        const { isLoading , post } = this.state;
        const commentsReactorList = this.state.commentsList;

        if (isLoading || !post ) {
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
            const { author, title, content, commentList, createdTime, postId} = post!
            const { commentIsLoading } = this.state;
            console.log("comments test", this.state);
            return (
                <>
                
                    <POSTAREA key={postId + "_KEY"}>

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
                        

                        <R6TextArea placeholder='덧글을 입력해주세요' textRef={ (ref) => this.commentInput = ref }/>
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
                                        this.reactor?.dispatch({type:"CLICKREPLY", postId: postId, content:(this.commentInput as any).current.value})
                                    } else {
                                        this.props.reactor.dispatch({type:"CLICKLOGINBUTTON"})
                                    }
                                    
                                    }}/>
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
                            { commentsReactorList.length !== 0 ? this.commentList(commentsReactorList) : this.commentList(commentList) }
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

export default withRouter(R6Post)
