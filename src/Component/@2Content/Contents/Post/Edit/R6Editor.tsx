import { Editor } from '@toast-ui/react-editor'
import React  from 'react'
import { Button, Loader, Dimmer, Segment, Portal } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import R6EditorReactor, { EditorinitialState, EditorState } from './R6EditorReactor';

import styled from 'styled-components'

// import R6IDSearch from './IDSearch/R6IDSearch'
import { RANKAPI } from '../../../../../Util/Entity';
import ForumReactor, { ForumReactorProps, ForumReactorProp } from "../../../../@0ForumReactor/ForumReactor";
import R6IDSearch from './R6IDSearch/R6IDSearch';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { interval } from 'rxjs';
import R6Ajax from '../../../../../Library/R6Ajax';
import { map, distinctUntilChanged, filter, skip } from 'rxjs/operators';
import { deepDistinctUntilChanged } from 'reactivex-redux';

const FLUIDDIV = styled.div`
    width:100%;
    margin-bottom:10px;
`

const FLUIDDIV1 = styled.div`
    width:50%;
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

class R6Editor extends React.Component<ForumReactorProp & RouteComponentProps, EditorState>{

    private editorRef  = React.createRef<Editor>();
    private titleRef  = React.createRef<any>();

    reactor : R6EditorReactor;

    constructor(props:any){
        super(props);
        this.state = EditorinitialState;
        this.reactor = new R6EditorReactor(EditorinitialState)
    }
    
    componentDidMount(){

        this.reactor?.state.pipe(
            map( res => res.isLoading ),
            distinctUntilChanged(),
            skip(1),
        ).subscribe(
            isLoading => this.setState({isLoading})
        )

        this.reactor?.fireImmediately( 
            value => value.type === "ADDRANKDATA" ,
            (result: any) => {
                this.insertTable( result.data, result.platform, result.id)
            }
        )

        this.reactor?.fireImmediately( 
            value => value.type === "SUCCESS" ,
            (result: any) => {
                this.props.reactor.dispatch({type:"SETPAGENO",pageId: result.postId })
                this.props.history.push(`post/${result.postId}`)
            }
        )






        // this.reactor?.state.pipe(
        //     filter( value => value. === ""),
        //     deepDistinctUntilChanged(),
        // ).subscribe(
        //     res => this.insertTable(res.)
        // )
        // this.reactor?.state.pipe(
        //     map( res => res.data ),
        //     distinctUntilChanged(),
        //     skip(1),
        // ).subscribe(
        //     // data => this.insertTable(data)
        // )
        
        
        // const toBase64 = (file: any) => new Promise((resolve, reject) => {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     reader.onload = () => resolve(reader.result);
        //     reader.onerror = error => reject(error);
        // });

        // interval(1000).subscribe(
        //     // res=>console.log(this.editorRef.current?.getInstance().getHtml())
        // )

        // this.getInstanceofEditor()?.addHook('addImageBlobHook', ( a,b) => {
        //     // const reader = new FileReader();
        //     // const h = reader.readAsDataURL(a);
        //     // console.log(h);
        //     var formData = new FormData();
        //     formData.append('files', a);
        //     formData.append('content', "안녕");
        //     formData.append('type', "free");
        //     formData.append('title', "이미지테스트다");
        //     R6Ajax.shared.post('post', formData, "multipart", true).subscribe();

        //     // let formData = new FormData();
        //     // formData.append('image', a);
        //     // console.log(formData);
        // })

        // this.reactor?.dispatch({type:"CLICKREGISTERBUTTON", })
    }

    onAddImageBlob(blob: any, callback: any) {
        //insert blob..
        //and set data...
        // console.log(blob);
        // this.uploadImage(blob);
        // this.editorRef.current?.getInstance().setHtml(
        //     `<img src= ${blob} >`
        // )
        //image insert
        //then we can add something..?

        // callback("https://miro.medium.com/max/1400/1*PIuIAKbuu-QaoAvVk02PiQ.gif", 'alt text');
        // uploadImage(blob)
        //     .then(response => {
        //         if (!response.success) {
        //             throw new Error('Validation error');
        //         }
    
        //         callback(response.data.url, 'alt text');
        //     }).catch(error => {
        //         console.log(error);
        //     });
    };
    

    uploadImage(blob: any) {
        
        let formData = new FormData();
        // file in a 'multipart/form-data' request
        // formData.append(0, blob, blob.name);
        // console.log(formData);
        // data uri

        // return fetch('/upload/image', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => {
        //     if (response.ok) {
        //         return response.json();
        //     }
    
        //     throw new Error('Server or network error');
        // });
        //https://junwoo45.github.io/2020-07-28-chrome_devtools/?fbclid=IwAR2JRCQRpluIn6JmN2mne55mUASDLWxWVxoj3L2beX2a7CPQmjddOIldrS4
    };

    
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
        this.getInstanceofEditor()?.setHtml(newone
        , true)
    }

    
    render(){
    
            const { topic } = this.props.reactor.getState();
            const { isLoading } = this.state;

            return(

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
                    <R6IDSearch reactor={this.reactor} ></R6IDSearch>
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
                        <Button size={"big"} disabled={this.state.isLoading} onClick={()=> {this.props.history.goBack()}}> 취소하기 </Button>
                        <Button size={"big"} loading={this.state.isLoading} disabled={this.state.isLoading} positive onClick={()=>{ 

                            const { isLogined } = this.props.reactor.getState();
                            if (!isLogined) {
                                this.props.reactor?.dispatch({type:"CLICKLOGINBUTTON"})
                            } else {
                                const html: string = (this.getHtml()) ? this.getHtml()! : ""
                                this.reactor?.dispatch({type:"CLICKREGISTERBUTTON", title: this.titleRef.current!.inputRef.current.value, content:html, topic: topic})
                            }
                        }}> 등록하기 </Button>
                    </BUTTONGROUP>
                </FLUIDDIV>
            </CONTAINER>
            )
        }
       
    
}

export default withRouter(R6Editor)