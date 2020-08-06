
import styled from 'styled-components'
import React, { useState } from 'react'
import { R6RankIcon } from '.'
import { Icon, Button } from 'semantic-ui-react'
import R6TextArea from './R6TextArea'
import { CommentType } from '../../Util/Entity'
import Moment from 'react-moment'


interface Props {
    /** childComment 여부. 재귀호출 */
    /** 덧글 내용 */
    comment: CommentType;
    /** 수정가능한지 */
    isEditable?: boolean;
    /** 답글창이 열려있는지 */
    isReplying?: boolean;
    /** 날짜 */
    date?: string;
    /** 아이디 */
    id?: string;
    /** 프로필 */
    profile?: string;
    /** parent */
    parentId?: string;
    /** isBest */
    isBest?: boolean;
    isChild: boolean;
    onSubmit?: (info: any) => void;

}



const COMMENTGRID = styled.div`
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
    // border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 0px 10px;
`

const PROFILECONTAINER = styled.div`
    display:flex;
    align-items:center;
    flex-basis:40px;
    max-height:40px;


    #profile {
        font-weight:bold;
        margin-right:10px;
        margin-left:-5px;
    }

    #id {
        font-weight: bold;
        margin-right:10px;
        font-size:1.2rem;
    }

    #time {
        color : #A9A9A9;
    }
`

const CONTENTCONTAINER = styled.div`
    display:flex;
    flex-grow:1;
    padding-top:10px;
    padding-bottom:10px;
    max-height:120px;
    align-items:center;
`

const CHILDCONTAINER = styled.div`
`

const BUTTONAREA = styled.div`
    display:flex;
    flex-basis:40px;
    max-height:40px;
    align-items:center;
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


export default function R6Comment({ isChild, id, comment , onSubmit} : Props) {

    const [state, setState] = useState(false);
    //comment group에서 관리해줘야함. setState에 대한 listenr를 막기위함.
    //group에서 state를 관리할 수 있는 방법도있음. 열어줄지 안열어줄지..
    //각자 state를 관리하기?
    //답글달기 추가하기.
    
    return (
        <COMMENTGRID>

            <PROFILECONTAINER>
                { isChild && <Icon name={"level up alternate"} flipped={"vertically"} rotated={"clockwise"}></Icon>}
                <R6RankIcon style={{marginLeft:"-5px"}} rank={"SILVER_I"} size={30}></R6RankIcon>
                <div id="id">{comment.username}</div>
                {/* <Moment>{ props => <span id="time">{comment.createdTime}</span>}</Moment> */}
            </PROFILECONTAINER>
            <CONTENTCONTAINER>
                {comment.content}
            </CONTENTCONTAINER>

            { !isChild && 
                <BUTTONAREA>
                    <Button icon color={"black"} size={"mini"} compact onClick={()=>{setState(!state)}}>
                            <Icon name={"reply"}></Icon>
                            &nbsp; 답글달기
                    </Button>
                </BUTTONAREA>
            }
            {
                state && 
                <CHILDBACKGROUND>

                    <R6TextArea placeholder={`${comment.username} 에게 덧글 달기..` }/>

                    <BUTTONGROUPAREA>
                        <Button color={"green"} size={"small"} compact onClick={onSubmit}>
                                    작성하기
                        </Button>
                        <Button color={"grey"} size={"small"} compact onClick={()=>setState(false)}>
                                    취소
                        </Button>
                    </BUTTONGROUPAREA>
                </CHILDBACKGROUND>
            }

            <CHILDCONTAINER>
                {
                    comment.childComment.map( (value, index) => {
                        return <R6Comment isChild={true} comment={value} key={comment.commentId+index+"_CHILD_COMMENT"}></R6Comment>
                    })
                }
            </CHILDCONTAINER>

        </COMMENTGRID>
    )
}

R6Comment.defaultProps = {
    isChild : false
}