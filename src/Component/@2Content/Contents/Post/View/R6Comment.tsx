
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

const COMMENTGRID = styled.div<{isNew?: boolean}>`
    position:relative;
    display: flex;
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

const CHILDBACKGROUND = styled.div`
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
    onClick?:(value: number) => void;
    onCancel?:()=>void;
    onSubmit: (content:string, parentId?: number) => void;
}

export default class R6Comment extends React.PureComponent<Props> {

    // const [state, setState] = useState(false);
    // let thisTextRef = useRef<HTMLTextAreaElement>(null);
    // comment group.
    // comment group? how to?
    // reply click, make a new something?
    // is child? how?

    thisTextRef = React.createRef<HTMLTextAreaElement>();


    handleOnSubmit(){
        if (this.props.comment.parentId) {
            this.props.onSubmit(this.thisTextRef.current!.value, this.props.comment.parentId)
        } else {
            this.props.onSubmit(this.thisTextRef.current!.value, this.props.comment.commentId)
        }
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

    render(){
        return (
            <COMMENTGRID>
                <UPDOWNAREA>
                    <Button icon size={"mini"} color={"black"} basic>
                        <Icon name={"thumbs up"}/>
                    </Button>
                    <Button icon size={"mini"} color={"black"} basic>
                        <Icon name={"thumbs down"} />
                    </Button>
                </UPDOWNAREA>
                <PROFILECONTAINER>
                    { this.props.comment.isChild && <Icon name={"level up alternate"} flipped={"vertically"} rotated={"clockwise"}></Icon>}
                    <R6RankIcon style={{marginLeft:"-5px"}} rank={"SILVER_I"} size={30}></R6RankIcon>
                    <div id="id">{this.props.comment.username}</div>
                    <div id="time"><Moment locale="ko" fromNow>{this.props.comment.createdTime}</Moment></div>
                </PROFILECONTAINER>

                <CONTENTCONTAINER isChild={this.props.comment.isChild}>
                    <CONTENTAREA>
                        { this.props.comment.isChild && <TAG> @{this.props.comment.parentNickname} </TAG>}
                        {this.props.comment.content}
                    </CONTENTAREA>
                </CONTENTCONTAINER>

                <BUTTONAREA isChild={this.props.comment.isChild} onClick={this.handleOnClick.bind(this)}>
                    <REPLYBUTTONAREA>
                            <Icon name={"reply"} size={"small"}></Icon>
                            답글달기
                    </REPLYBUTTONAREA>
                </BUTTONAREA>

                {
                    this.props.selected && 
                    <CHILDBACKGROUND>
                        <R6TextArea placeholder={`${this.props.comment.username} 에게 덧글 달기..` } textRef={(ref)=> this.thisTextRef = ref}/>
                        <BUTTONGROUPAREA>
                            <Button color={"green"} size={"small"} compact onClick={this.handleOnSubmit.bind(this)}>
                                        작성하기
                            </Button>
                            <Button color={"grey"} size={"small"} compact onClick={this.handleOnCancel.bind(this)}>
                                        취소
                            </Button>
                        </BUTTONGROUPAREA>
                    </CHILDBACKGROUND>
                }

                {/* <CHILDCONTAINER> */}
                    {/* {
                        comment.childComment.map( (value, index) => {
                            return <R6Comment isChild={true} comment={value} key={comment.commentId+index+"_CHILD_COMMENT"} onSubmit={onSubmit}></R6Comment>
                        })
                    } */}
                {/* </CHILDCONTAINER> */}

            </COMMENTGRID>
        )
    }
}

