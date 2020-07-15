import { Editor } from '@toast-ui/react-editor'
import React from 'react'
import { Button, Header, Search } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

//action이 잘 들어가는지 (so)
//mutate가 잘되는지
//Mutate에 맞게 뷰가 잘 수정되는지<div className=""></div>

interface Props {
    //content string type html?
    onSubmit?: (title: string, content: string) => void;
    onCancel?: () => void;
}

export default class R6CommunityEditor extends React.Component<Props>{

    private editorRef  = React.createRef<Editor>();

    private getInstanceofEditor() {
        return this.editorRef.current?.getInstance()
    }

    private getHtml(){
        return this.getInstanceofEditor()?.getHtml();
    }

    onSubmit(){
        // this.props.onSubmit()
    }

    render(){
        return(
            <>
            <div style ={{
                display:"flex",
                flexDirection:"column",
                alignItems:"flex-start",
                justifyContent:"center",
                background:"red",
                width:'100%',
            }}>

            <Input
                style={{width:'100%'}}
                placeholder={"제목을 입력해주세요"}
            ></Input>

            <div style={{width:'100%'}}>
                <Search input={{ fluid: true }} />
            </div>

            <div style={{width:'100%', textAlign:"left"}}>
                <Editor 
                    initialEditType={"wysiwyg"}
                    ref={this.editorRef}
                />
            </div>
            </div>

            </>
        )
    }
}
