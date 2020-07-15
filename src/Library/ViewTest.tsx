
import React, { ComponentType, PureComponent, Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { callbackify } from "util";


//abstract class?
//abstract <implementatino className=""></implementatino>



/**
 * Action을 정의해봅시다.
 */

// Redux의 방식은 따르되, 다른게 있으면 좋은걸 써주세요!
// 이 Action은 항상 export 가능해야합니다.
export class ABC {

}

// export const TO_DO = 'TO_DO'
// export const DELETE_MESSAGE = 'DELETE_MESSAGE'
// //혹은 required? 어쩌구저쩌구를..하는것





// abstract class Reactor<Action,State> { 

//     private state!: State
//     private setState!: (state: State , callback?: (() => void) | undefined) => void;

//     constructor(initialState : State, setState:(state: State , callback?: (() => void) | undefined) => void) {
//         this.state = initialState
//         this.setState = setState
//     }

 



//     // dispatcher(a : Action, ...args:any){ 
//     //     let newState = this.state;

//     //     //disp
//     //     //이에맞는 리듀서를 시행해야합니다<div className=""></div>
//     //     //여기에 리듀서를 작성해주세요. 액션별로 작성하시는게 좋을걸요?
//     //     return newState
//     // }

    
//     abstract action(a : Action, payload: any) : Action;
//     abstract mutate(action : ChatActionTypes) : void ;


//     reducer() {

//     }

//     subscribe( cb : (state?: State) => void ) {
//         //새로운 state를 줍니다.
//         //이 state에 맞게 new State를 업데이트하죠.
//         cb(this.state);
//     }

//     // updator(fn : Function) {
//     //     fn(state);
//     // }
// }

// //Action을 어떻게 부를까요?


  
// interface State {
// }



// class TestReactor extends Reactor<ChatActionTypes, State> {

//     //action은 누군가 나를 콜하면.. 그다음에 mutation으로 신호를 보냅니다
    
//     constructor(initialState : State, setState:(state: State , callback?: (() => void) | undefined) => void){
//         super(initialState, setState);
//     }

//     // RxJS로 구현해보기? subscrption에는?
//     /** ACTIONS : 액션 생성자, 후에는 반드시 mutate를 불러야합니다 */
//     // Observable ACtion 
//     sendMessage(id : number): void {
//         this.mutate( {
//             type:"DELETE_MESSAGE",
//             meta: {
//                 timestamp: id
//             }
//         })
//     }


//     /** MUTATE : side effect가 일어날 수 있는곳 여기에서 reducer로 패치 */
//     mutate(action : ChatActionTypes) {
//         switch(action.type){
//             case "DELETE_MESSAGE":
//                 fetch("http://www.naver.com").then( response => {
//                     this.reduce()
//                 })
//         }
//         //call reducer 전용타입이 있습니다
//     }

//     reduce()

    
//     //action크리에이터에 대한 내용을 적어주세요.
//     //그리고 callDispatcher를 부릅니다

    
//     //dispatcher를 부르면 dispatch에서 mutatation을 통해 데이터를 전달합ㄴ디ㅏ.

//     creator(a: ChatActionTypes) {
//         //액션콜러를 불러야합니다. 어떻게?
//         //어떤액션을 불러주세요
//         //액션과 payload를 입력하면 액션뭉치가나오게되죠

//     }

//     action(a: ChatActionTypes, payload: any): ChatActionTypes {
//         switch(a.type) {
//             case "TO_DO":
//                 return a;
//             case "DELETE_MESSAGE":
//                 return a;
//         }
//     }

// }

// //테스트스를 위한 프레임워크입니다.

// class View extends React.Component<{}, State> {

//     private reactor? : TestReactor;

//     componentDidMount(){

//         const a = new TestReactor(this.state, this.setState);
//         //domutation -> reduce -> state를 변경합니다
//         a.action()
//         a.subscribe( (state) => {
//             this.setState({isLoaded : state!.isLoaded});
//         })

//     }

//     render(){

//         return(
//             <div onClick={()=>{this.reactor?.dispatcher("TO_DO_1",1,2,3)}}></div>
//         )
//     }
