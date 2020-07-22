import React from "react";
import styled from 'styled-components'
import { Button } from "semantic-ui-react";
import Global, { GlobalReactorProps } from "../../ReactorKit/Global";
import { ModalReactor, ModalState } from "../Modal/ModalReactor";

const NAVIGATIONSTYLE = styled.nav`
    max-width:1200px;
    height:70px;
`

const GLOBALNAV = styled.nav`
	position: relative;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 75px;

`
const NAVITEMS = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  
`

const BRANDLOGO = styled.a`
    font-family: 'Anton', sans-serif;
    font-size: 2.8rem;
    color:black;
    cursor: pointer;
    text-decoration: unset;
    margin-right:auto;

    &:hover {
        color: black;
    }
  
`
class GlobalNavigation extends React.Component<GlobalReactorProps<ModalReactor,ModalState>> {

    render(){
        return(
            <GLOBALNAV>
                <NAVITEMS>
                    <BRANDLOGO> R6 Search - TALK </BRANDLOGO>
                    <Button secondary compact onClick={()=>{this.props.globalReactor.action.next({type:"MODALTOGGLE"})}}>로그인하기</Button>
                </NAVITEMS>
            </GLOBALNAV>
        )
    }
}

export default Global(GlobalNavigation, ModalReactor.name)


/**
 * 
 * 모든 타입을 정하는것보다, 실제로 짜면서 정하는게 좋다고 생각했습니다.
 * 
 * 업그레이드를 하게되죠.
 * 
 * 바로 MOBX를 따라하는거죠.
 * 
 * 수행 기준을 보겠습니다.
 * 
 * @state = initialState가 동반되어야합니다.
 * 
 * 
 * @action
 * // 이 액션은 하기 위함입니다.
 * // 여기서는 mutation을 부를수도, 혹은 state를 바로 부를 수도있습니다.
 * 
 * @mutation
 * // 액션에서 나오는 비동기처리를 처리할 수 있습니다.
 * // 여기서는 상태를 변경해야합니다.
 * // 상태는 복제되어 전달됩니다.
 * 
 * 
 * @action 뷰입장에서 action을 상세하게 적어야합니다. 
 * @mutation
 * 
 * @state abc = 5
 * 
 * @action
 * public increasebuttonClicked(){
 *  //액션의 결과로 나오는것? counter ++ 
 *  // 카운터 인크리즈 버튼을 눌러주세요
 *  // mutation에서는 counter increase button이 등장!
 *  
 *  return this.increaseButtonClicked;
 * }
 * 
 * @mutate
 * private increasebuttonClicked(private ){
 * 
 *  return state
 * }
 *
 */
/**
 * @state
 * 앱의 결과 state입니다.
 * 
 * @action
 * 앱의 액션입니다.
 * 
 * @mutation
 * p
 * return mutation
 * 
 * action 트리거의 역할을 누가할것인가
 * 
 * @action-received
 * 
 * @action-trigger
 * 
 * 
 * @action을 불러준다.
 * 
 * @action("TRIGGER")
 * trigger(){
 * }
 * 
 * @action("TRIGGER")
 * trigger2(){
 * }
 * 
 * onclick시에 이걸 불러주도록한다.
 * 
 * 
 * <ReactorDiv onClickAction={this.props.action}}>
 * </ReactorDiv>
 * 
 * <ReactorDiv onClickAction={this.props.reducer}>
 * 
 * 
 * state는 바로 앱의 스테이트를 말한다.
 * 
 * @sApptate
 * 
 * @Appstate
 */
