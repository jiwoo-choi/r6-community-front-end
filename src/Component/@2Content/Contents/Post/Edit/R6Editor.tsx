import { Editor } from '@toast-ui/react-editor'
import React  from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import R6EditorReactor, { EditorinitialState } from './R6EditorReactor';

import styled from 'styled-components'

// import R6IDSearch from './IDSearch/R6IDSearch'
import { RANKAPI } from '../../../../../Util/Entity';
import ForumReactor, { ForumReactorProps } from "../../../../@0ForumReactor/ForumReactor";
import R6IDSearch from './R6IDSearch/R6IDSearch';

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
// & ${FLUIDDIV} + ${FLUIDDIV} {
//     margin-bottom:20px;
// }

interface Props {
    //content string type html?
    onSubmit?: (title: string, content: string) => void;
    onCancel?: () => void;
}

class R6Editor extends React.Component<Props & ForumReactorProps>{

    private editorRef  = React.createRef<Editor>();
    reactor? : R6EditorReactor;

    componentWillMount(){
        this.reactor = new R6EditorReactor(EditorinitialState)
    }

    componentDidMount(){
        //this.current
        // this.props.reactor?.state.pipe(
        //     map( value => value.data),
        //     // deepDistinctUntilChanged(),
        // ).subscribe(
        //     res=> console.log(res)
        //     // res => this.insertTable(data, )
        // )
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
        <th><strong>구분</strong></th>
        <th><strong>데이터</strong></th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>아이디</td>
        <td>${id}</td>
        </tr>
        <td>플랫폼</td>
        <td>${platform}</td>
        </tr>
        <tr>
        <td>랭크</td>
        <td>${data.rankString}</td>
        </tr>
        <tr>
        <td>MMR</td>
        <td>${data.mmr}</td>
        </tr>
        <tr>
        <td>시즌 최대 랭크</td>
        <td>${data.maxRankString}</td>
        </tr>
        <tr>
        <td>시즌 최대 MMR</td>
        <td>${data.maxMmr}</td>
        </tr>
        <tr>
        <td>승률</td>
        <td>${
            WD
        } % </td>
        </tr>
        <tr>
        <td>K/D</td>
        <td>${KD} %</td>
        </tr>
        </tbody>
        </table>
        `
        this.getInstanceofEditor()?.setHtml(newone
        , true)
    }

    onSubmit(){
        // this.props.onSubmit()
    }

    render(){
       
            const parentReactor = this.props.reactor_control!.getState();
            const localReactor = this.reactor;
            const { topic } = parentReactor;

            return(

                <CONTAINER>       
                <FLUIDDIV>
                    <Input
                        size={'large'}
                        style={{width:'100%'}}
                        placeholder={"제목을 입력해주세요"}
                    />
                </FLUIDDIV>
    
                <FLUIDDIV>
                { topic === "together" && 
                    <R6IDSearch {...this.props} ></R6IDSearch>
                }
                </FLUIDDIV>

                <FLUIDDIV>
                    <Editor 
                        height={"600px"}
                        initialEditType={"wysiwyg"}
                        ref={this.editorRef}
                    />
                </FLUIDDIV>
    
                <FLUIDDIV>
                    <BUTTONGROUP>
                        <Button size={"big"} onClick={this.props.reactor_control?.dispatcher!({type:"CLICKBACK"})}> 취소하기 </Button>
                        <Button size={"big"} positive> 등록하기 </Button>
                    </BUTTONGROUP>
                </FLUIDDIV>
            </CONTAINER>
            )
        }
       
    
}

export default R6Editor