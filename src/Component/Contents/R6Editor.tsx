import { Editor } from '@toast-ui/react-editor'
import React from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components'

import R6IDSearch from './IDSearch/R6IDSearch'
import { observer } from "mobx-react"
import axios from 'axios';
import R6IDSearchStore from './IDSearch/R6IDSearchStore';
import { StoreAcceptable } from '../../Util/Types';
import { RANKAPI } from '../../Util/Entity';

//action이 잘 들어가는지 (so)
//mutate가 잘되는지
//Mutate에 맞게 뷰가 잘 수정되는지<div className=""></div>
//rxjs

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

@observer
export default class R6CommunityEditor extends React.Component<Props & StoreAcceptable<R6IDSearchStore>>{

    private editorRef  = React.createRef<Editor>();

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
                <R6IDSearch 
                    dataClicked={(data: RANKAPI, platform: string, id: string) => { this.insertTable(data, platform, id)}}
                    store={this.props.store}
                    input={{ fluid:true , size:"large"}} 
                />
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
                    <Button size={"big"} > 취소하기 </Button>
                    <Button size={"big"} positive> 등록하기 </Button>
                </BUTTONGROUP>
            </FLUIDDIV>
        </CONTAINER>
        )
    }
}
