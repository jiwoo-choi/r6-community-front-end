import { Editor } from '@toast-ui/react-editor'
import React  from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import styled from 'styled-components'
import { RANKAPI } from '../../../../../Util/Entity';
import R6IDSearch from './R6IDSearch/R6IDSearch';
import { inject, observer } from 'mobx-react';
import EditorStore from '../../../../Stores/EditorStore';
import IDSearchStore from './R6IDSearch/IDSearchStore';
import ForumStore from '../../../../Stores/ForumStore';

const FLUIDDIV = styled.div`
    width:100%;
    margin-bottom:10px;
`
const BUTTONGROUP = styled.div`
    display:flex;
    justify-content: flex-end;
`
const CONTAINER = styled.div`
    display:flex
    flex-direction:column;
    align-items:flex-start;
    width:100%;
`

const EDITORAREA = styled.div`
    font-size:1.2rem;
`


// & ${FLUIDDIV} + ${FLUIDDIV} {
//     margin-bottom:20px;
// }


interface Props {
    editor?: EditorStore;
    forum?: ForumStore;
}

@inject(({forum, editor})=> ({forum: forum, editor:editor }))
@observer
class R6Editor extends React.Component<Props>{

    private editorRef  = React.createRef<Editor>();
    private titleRef  = React.createRef<any>();
    store? : IDSearchStore;

    componentDidMount(){
        window.scrollTo(0,0);
        this.getInstanceofEditor()?.addHook('addImageBlobHook', this.onAddImageBlob.bind(this))   
    }

    componentWillMount(){
        this.store = new IDSearchStore();
    }

    onAddImageBlob(blob: any, callback: any) {

        this.uploadImage(blob)
            .then(response => {
                callback(response.imageUrl[0], 'alt text');
            }).catch(error => {
            });
    }
    
    uploadImage(blob: any) {

        let formData = new FormData();
        formData.append('imageFiles', blob);

        return fetch('https://r6-search.me/api/c/image', {
            method: 'POST',
            body: formData,
            headers : { "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LWFjY291bnQiLCJpYXQiOjE1OTcwMjUxMDYsImV4cCI6MTU5NzExMTUwNn0.vRFds9I325-I4UV_lPikSaGJWc6PaESzZe4Fuac-aIU"}
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Server or network error');
            }
        }).catch( (err) => {
            throw new Error('Server or network error');
        })
        //https://junwoo45.github.io/2020-07-28-chrome_devtools/?fbclid=IwAR2JRCQRpluIn6JmN2mne55mUASDLWxWVxoj3L2beX2a7CPQmjddOIldrS4
    }

    
    private getInstanceofEditor() {
        return this.editorRef.current?.getInstance()
    }

    private getHtml(){
        return this.getInstanceofEditor()?.getHtml();
    }

    private insertTable(data: RANKAPI, platform: string, id: string){
        const WD = (data.wins+data.losses > 0) ? Math.floor((data.wins/(data.wins+data.losses))*100) : 0
        const KD = (data.kills+data.death > 0) ? Math.floor((data.kills/(data.kills+data.death))*100) : 0
        const current = this.getHtml();
        const newone = current + `
        <table>
        <thead>
        <tr>
        <th><strong>아이디</strong></th>
        <th><strong>플랫폼</strong></th>
        <th><strong>랭크</strong></th>
        <th><strong>MMR</strong></th>
        <th><strong>시즌 최대 랭크</strong></th>
        <th><strong>시즌 최대 MMR</strong></th>
        <th><strong>승률</strong></th>
        <th><strong>K/D</strong></th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>${id}</td>
        <td>${platform}</td>
        <td>${data.rankString}</td>
        <td>${data.mmr}</td>
        <td>${data.maxRankString}</td>
        <td>${data.maxMmr}</td>
        <td>${
            WD
        } % </td>
        <td>${KD} %</td>
        </tr>
        </tbody>
        </table>
        `
        this.getInstanceofEditor()?.setHtml(newone, true)
    }

    
    handleSubmit(){
        /**
         * 
            const { isLogined } = this.props.reactor.getState();
            if (!isLogined) {
                this.props.reactor?.dispatch({type:"CLICKLOGINBUTTON"})
            } else {
                const html: string = (this.getHtml()) ? this.getHtml()! : ""
                this.reactor?.dispatch({type:"CLICKREGISTERBUTTON", title: this.titleRef.current!.inputRef.current.value, content:html, topic: topic})
            }
         */

        const regex = /https:\/\/d13wxwpxw6qcg\.cloudfront\.net\/(.+?)(\"|\))/g;
        const str = this.getHtml()!;
        let m;
        let imgSrc = [];
        while ((m = regex.exec(str)) !== null) {
            
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            if (m.length === 3) {
                imgSrc.push("https://d13wxwpxw6qcg.cloudfront.net/"+m[1]);
            }
        }
        // const value = regExp.exec(this.getHtml()!);
        // console.log(value);
        // console.log(this.getHtml()!);
        this.props.editor?.upload(this.titleRef.current!.inputRef.current.value, str, imgSrc);
    }
    
    render(){
    
            const { topic } = this.props.forum!
            const { isLoading } = this.props.editor!

            return(
                <>
                {/* <Segment>
                    <Icon name={"arrow left"}></Icon>
                </Segment> */}
                <CONTAINER>
                <FLUIDDIV>
                    <Input
                        size={'large'}
                        style={{width:'100%'}}
                        placeholder={"제목을 입력해주세요"}
                        ref={this.titleRef}
                    />
                </FLUIDDIV>
    
                <FLUIDDIV>
                { topic === "together" && 
                    <R6IDSearch dataClicked={this.insertTable.bind(this)} store={this.store!}></R6IDSearch>
                }
                </FLUIDDIV>

                <FLUIDDIV>
                    <EDITORAREA>
                        <Editor 
                            height={"600px"}
                            initialEditType={"wysiwyg"}
                            ref={this.editorRef}
                        />
                    </EDITORAREA>
                </FLUIDDIV>
    
                <FLUIDDIV>
                    <BUTTONGROUP>
                        <Button size={"big"} disabled={isLoading}> 취소하기 </Button>
                        <Button size={"big"} loading={isLoading} disabled={isLoading} positive onClick={this.handleSubmit.bind(this)}> 등록하기 </Button>
                    </BUTTONGROUP>
                </FLUIDDIV>
            </CONTAINER>
            </>
            )
        }
       
    
}

export default R6Editor