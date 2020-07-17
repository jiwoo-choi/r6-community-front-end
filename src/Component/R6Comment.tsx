import React from "react";
import {Comment, Header, Form, Button, Icon} from 'semantic-ui-react'


export interface CommentDataType {
    meta : string,
    content: string,
    id: string,
} 

interface Props {
    comments : CommentDataType[]
}
export default class R6Comment extends React.Component<Props> {

    getComments(comments: CommentDataType[]) {
        return comments.map( (comment, index) => {
            return (
            <Comment key={"COMMENT_" + index}> 
                <Comment.Content>
                <Comment.Author as='a'>{comment.id}</Comment.Author>
                <Comment.Metadata>
                <div>1 day ago</div>
                </Comment.Metadata>
                <Comment.Text>
                    <p>
                        {comment.content}
                    </p>
                </Comment.Text>
                </Comment.Content>
            </Comment>)
        })
    }

    render(){

        return(
            <Comment.Group>
            <Header as='h3' dividing>
              덧글
            </Header>
            {this.getComments(this.props.comments)}
            <Form reply size={"small"}>
              <Form.TextArea />
              <Button content='덧글달기' labelPosition='left' icon='edit' primary />
            </Form>
          </Comment.Group>

        )
    }
}

