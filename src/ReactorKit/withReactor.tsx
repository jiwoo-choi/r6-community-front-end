import { Reactor } from "./Reactor";
import { ComponentClass } from "react";
import React from "react";

export function withReactor<
    R extends Reactor<any,State,any>,
    State
> ( Component : ComponentClass<{reactor?: R, currentState?:State}> ) : ComponentClass<{reactor?:R}>{
    //글로벌로 받을지
    //아니면 여기서받을지?
    //renderer props?
    //HOC? renderer Props?
    //랜더러프롭스.. 
    //currentState...
    // grouping으로?

    return class extends React.PureComponent<{reactor?:R}, {updater : number}> {
        
        
        constructor(props:{reactor?:R}){
            super(props);
            this.state = {
                updater : 1
            }
        }

        componentDidMount() {
            this.props.reactor?.state.subscribe( res => this.setState({updater: this.state.updater * -1}))
            //맵퍼만들어서 그걸 이용하기.
            // withReactor()(Compomnent)
            //ampper은 어디서?
            // force update
            // 증분랜더링 막기.
            // state만들기
            // withprops
            // this.setState({state:1});
            // 변경되면 다시그려준다?
            // currentState를 넣어주고 setState를 바꿔준다<div className=""></div>
            // 증분렌더링을 마긍ㄹ 애들이 필요하다.
            // 기본적인 필터링을 해야하긴한다.
        }
        
        render(){
            return <Component {...this.props} currentState={this.props.reactor?.currentState}> </Component>
        }
    }
    
}

