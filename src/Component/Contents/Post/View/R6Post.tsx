import React from "react";
import ForumReactor, { ForumState, ForumReactorProps } from "../../../@Forum/ForumReactor";
import styled from "styled-components";
import { Viewer } from '@toast-ui/react-editor'
import { withReactor } from 'reactivex-redux'
import { Placeholder, Segment, Image, Header, Divider, Comment, Form, Button } from "semantic-ui-react";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import './R6Post.css';
import Moment from "react-moment";

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
class R6Post extends React.PureComponent<ForumReactorProps> {

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
            const { author, title, content, commentList, createdTime } = post!
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
                            <Viewer initialValue={"asdfasdfasdfasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsasdfasdfasdfadfsadfs"}/>
                        </VIEWERAREA>

                        <Header as='h2' dividing>
                            덧글
                        </Header>

                        <Form reply>
                        <Form.TextArea />
                        <Button content='Add Reply' labelPosition='right' icon='edit' primary />
                        </Form>



                        <Comment.Group>

                        <Comment>
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>
                       

                        <Comment>
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>
                        <Comment>
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>
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