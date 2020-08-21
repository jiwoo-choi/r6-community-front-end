
import styled, {keyframes} from 'styled-components'
import React from 'react'
import { R6RankIcon } from '../../../../@Reusable-Component'
import { Icon, Button } from 'semantic-ui-react'
import R6TextArea from './R6TextArea'
import { CommentType } from '../../../../../Util/Entity'
import Moment from 'react-moment'


const ANIMATE = keyframes`
    from {
        background: rgba(0,0,0,0.5);
    }

    to {
        background: white;
    }
`

const COMMENTGRID = styled.div<{isNew?: boolean, show? : boolean}>`
    ${props => {
        if (!props.show) {
            return 'display:flex;'
        } else {
            return 'display:none;'
        }
    }}

    position:relative;
    // display: flex;
    flex-direction: column;
    justify-content:flex-end;
    // border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 0px 10px;
    // ${props => props.isNew ? `animation: ${ANIMATE} 1s linear`: ""};
    // transition: 1s;
`

const UPDOWNAREA = styled.div`
    position:absolute;
    right:10px;
    top:8px;
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    align-items:center;
`

const PROFILECONTAINER = styled.div`
    display:flex;
    align-items:center;
    flex-basis:45px;
    max-height:45px;

    #profile {
        font-weight:bold;
        margin-right:10px;
        margin-left:-5px;
    }

    #id {
        font-weight: bold;
        margin-right:10px;
        font-size:1.1rem;
    }

    #time {
        color : #A9A9A9;
    }
`

const CONTENTCONTAINER = styled.div<{isChild?: boolean}>`
    display:flex;
    flex-grow:1;
    padding-top:10px;
    padding-bottom:10px;
    max-height:1000px;
    align-items:center;
    ${props => props.isChild ? "padding-left:25px" : ""};
`

const REPLYBUTTONAREA = styled.div`
    dispaly:flex;
    user-select:none;
    cursor:pointer;
    color:#C9CFD3;
`


const BUTTONAREA = styled.div<{isChild?: boolean}>`
    display:flex;
    flex-basis:40px;
    max-height:40px;
    align-items:center;
    ${props => props.isChild ? "padding-left:25px" : ""};
`

const BUTTONGROUPAREA = styled.div`
    display:flex;
    justify-content:flex-end;
    // margin-bottom: 1rem;
`

const REPLYAREA = styled.div`
    background-color: rgba(0, 0, 0, 0.016);
    margin-top: 1.3125rem;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.02);
    border-image: initial;
    padding: 1rem;
    border-radius: 4px;
`


const EDITREPLYAREA = styled.div<{show?: boolean}>`
    ${props => {
        if (props.show) {
            return 'display:block;'
        } else {
            return 'display:none;'
        }
    }}
    background-color: rgba(0, 0, 0, 0.016);
    margin-top: 1.3125rem;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.02);
    border-image: initial;
    padding: 1rem;
    border-radius: 4px;
`

const TAG = styled.span`
    display:inline-block;
    background: #D1F2E7;
    color: #1AAE80;
    border-radius:10px;
    padding:2px 7px;
    margin-right:7px;
    user-select:none;
    font-weight:bold;
`
const CONTENTAREA = styled.span`
    display:inline-block;
    max-width:100%;
`

interface Props {
    comment:CommentType;
    selected?: boolean;
    value?:number;
    /** Group으로 부터 관리 받는 종속성 목록. */
    onClick?:(value: number) => void;
    onCancel?:()=>void;
    onCommentEditClick?:(value: number) => void;
    onCommentEditCancel?:()=>void;

    /** Post로 부터 관리받는 종속성 목록. */
    onSubmit: (content:string, replayUsername?: string, parentId?: number) => void;
    onCommentEdit?:(commentId: number, content: string)=>void;
    onCommentDelete?:(commentId: number)=>void;
    isEditable: boolean;
    isEditing?:boolean;
}

export default class R6Comment extends React.PureComponent<Props> {

    // const [state, setState] = useState(false);
    // let thisTextRef = useRef<HTMLTextAreaElement>(null);
    // comment group.
    // comment group? how to?
    // reply click, make a new something?
    // is child? how?

    replyTextRef = React.createRef<HTMLTextAreaElement>();
    editTextRef = React.createRef<HTMLTextAreaElement>();


    handleOnSubmit(){
        const parentId = this.props.comment.parentId ? this.props.comment.parentId : this.props.comment.commentId
        this.props.onSubmit(this.replyTextRef.current!.value, this.props.comment.username, parentId)
    }

    handleOnClick(){
        if (this.props.onClick){
            this.props.onClick(this.props.value!)
        }
    }
    
    handleOnCancel(){
        if (this.props.onCancel){
            this.props.onCancel()
        }                                
    }


    handleCommentDeleteOnClick(){
        //바로 삭제해 줘야함.
        if (this.props.onCommentDelete){
            console.log("hey");
            this.props.onCommentDelete(this.props.comment.commentId)
        }                                 
    }

    /**
     * 단순 수정 버튼 (연필) 클릭시.
     */
    handleCommentEditOnClick(){
        if (this.props.onCommentEditClick){
            this.props.onCommentEditClick(this.props.value!)
            this.editTextRef.current!.value = this.props.comment.content;       
        }                        
    }

      /**
     * 단순 수정 버튼 (연필) 클릭시.
     */
    handleCommentEditOnCancel(){
        if (this.props.onCommentEditCancel){
            this.editTextRef.current!.value = "";       
            this.props.onCommentEditCancel()
        }                        
    }

    /**
     * 수정버튼을 실제로 excute할때.
     */
    handleCommentEditExcute(){
        if(this.props.onCommentEdit){
            this.props.onCommentEdit(this.props.comment.commentId, this.editTextRef.current!.value)
        }
    }

    render(){
        
        const isChild : boolean = (this.props.comment.childComment === undefined);
        
        return (
            <>

                <EDITREPLYAREA show={this.props.isEditing}>
                        <R6TextArea textRef={(ref)=> this.editTextRef = ref}/>
                        <BUTTONGROUPAREA>
                            <Button color={"yellow"} size={"small"} compact onClick={this.handleCommentEditExcute.bind(this)}>
                                        수정하기
                            </Button>
                            <Button color={"grey"} size={"small"} compact onClick={this.handleCommentEditOnCancel.bind(this)}>
                                        취소
                            </Button>
                        </BUTTONGROUPAREA>
                </EDITREPLYAREA>

                <COMMENTGRID show={this.props.isEditing}>
                {
                    (this.props.isEditable && !this.props.isEditing) &&
                    <UPDOWNAREA>
                        <Button icon size={"mini"} color={"black"} basic onClick={this.handleCommentEditOnClick.bind(this)}>
                            <Icon name={"pencil"}/>
                        </Button>
                        <Button icon size={"mini"} color={"red"} basic onClick={this.handleCommentDeleteOnClick.bind(this)}>
                            <Icon name={"delete"} />
                        </Button>
                    </UPDOWNAREA>
                }


                <PROFILECONTAINER>
                    { isChild && <Icon name={"level up alternate"} flipped={"vertically"} rotated={"clockwise"}></Icon>}
                    <R6RankIcon style={{marginLeft:"-5px"}} rank={"SILVER_I"} size={30}></R6RankIcon>
                    <div id="id">{this.props.comment.username}</div>
                    <div id="time"><Moment locale="ko" fromNow>{this.props.comment.createdTime}</Moment></div>
                </PROFILECONTAINER>

                <CONTENTCONTAINER isChild={isChild}>
                    <CONTENTAREA>
                        { isChild && <TAG> @{this.props.comment.replayUsername!} </TAG>}
                        {this.props.comment.content}
                    </CONTENTAREA>
                </CONTENTCONTAINER>

                <BUTTONAREA isChild={isChild}>
                    <REPLYBUTTONAREA onClick={this.handleOnClick.bind(this)}>
                            <Icon name={"reply"} size={"small"}></Icon>
                            답글달기
                    </REPLYBUTTONAREA>
                </BUTTONAREA>

                {
                this.props.selected && 
                    <REPLYAREA>
                        <R6TextArea placeholder={`${this.props.comment.username} 에게 덧글 달기..` } textRef={(ref)=> this.replyTextRef = ref}/>
                        <BUTTONGROUPAREA>
                            <Button color={"green"} size={"small"} compact onClick={this.handleOnSubmit.bind(this)}>
                                        작성하기
                            </Button>
                            <Button color={"grey"} size={"small"} compact onClick={this.handleOnCancel.bind(this)}>
                                        취소
                            </Button>
                        </BUTTONGROUPAREA>
                    </REPLYAREA>
                }
                </COMMENTGRID>
            </>
        )
    }
}

