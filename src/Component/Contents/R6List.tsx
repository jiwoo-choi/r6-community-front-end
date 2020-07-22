import React from "react";
import {Comment, Header, Form, Button, Icon, Item, List} from 'semantic-ui-react'


// export interface CommentDataType {
//     meta : string,
//     content: string,
//     id: string,
// } 

export interface ListInterface { 
    
}

export default class R6List extends React.Component {

    render(){

        return(
            <List celled size={"huge"}>
            <List.Item>
              <List.Content>
                <List.Header>오늘오늘 잡은 썰 푼다 ㅋㅋㅋㅋ오늘 잡은 썰 푼다 ㅋㅋㅋㅋ오늘 잡은 썰 푼다 ㅋㅋㅋㅋ오늘 잡은 썰 푼다 ㅋㅋㅋㅋ 잡은 썰 푼다 ㅋㅋㅋㅋ</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>다 뒤졌다 ㅋㅋ</List.Header>
              </List.Content>
            </List.Item>
        </List>
        )
    }
}

