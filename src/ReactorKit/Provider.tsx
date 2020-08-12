import { PureComponent } from "react"
import React from "react";
import { Reactor } from "reactivex-redux";
import { observable } from "rxjs";


export interface ReactorType {
    [key:string]: Reactor<any,any,any>
}

export const RootReactor = React.createContext<ReactorType>({});

export default class Provider extends React.PureComponent<{[key:string]: Reactor<any,any,any>}> {

    componentWillMount(){
    }

    render(){
        return (
            <RootReactor.Provider value={this.props}>
                {this.props.children}
            </RootReactor.Provider>
        )
    }
}

// @observable
// @observable

// @inject('')
// @observer

//https://rokt33r.github.io/posts/why-i-replace-redux-with-mobx
//https://reactjs.org/docs/context.html#contextconsumer
//https://velog.io/@honeysuckle/MobX%EB%A5%BC-React-Hooks-TypeScript-%EC%99%80-%ED%95%A8%EA%BB%98-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94%EB%B0%A9%EB%B2%95
//https://velog.io/@velopert/MobX-3-%EC%8B%AC%ED%99%94%EC%A0%81%EC%9D%B8-%EC%82%AC%EC%9A%A9-%EB%B0%8F-%EC%B5%9C%EC%A0%81%ED%99%94-%EB%B0%A9%EB%B2%95-tnjltay61n
//https://github.com/kjk7034/create-react-app-typescript-mobx

// let a = { counter : new ForumReactor(ForumStateInitialState)}
//propsKey, and what? 
//all store and what?
// all store {counter?}
//({counter} => )
//바로뽑아주기 {  ( {counter} => { })}
// 바로 뽑아 주기.
// export function inject<P,Action,State,Mutation>( rectorInjector: (allStore : ReactorType) => Reactor<Action,State,Mutation>) {

//     // global store injection
//     return function (filterMapper?: (state: State) => Partial<State>) {

//         //filter mapping
//         return function ( Component: React.ComponentClass<P & {dispatcher:()=>void, getState: ()=>State}>) : React.ComponentClass<Omit<P, keyof {dispatcher:()=>void, getState: ()=>State}>> {

//             return class extends React.Component<Omit<P, keyof {dispatcher:()=>void, getState: ()=>State}>, {updatar: number}>  {
//                 //update를 막아줘야합니다.
                
//                 render(){

//                     return (

//                         <RootReactor.Consumer>
//                             {
//                                 (allReactor) => { 

//                                     const reactor : Reactor<Action,State,Mutation>  = rectorInjector(allReactor)
//                                     const dispatcher = ()=>{};
//                                     const getState = reactor.getState;
//                                     return <div></div>
//                                 }
//                             }
//                         </RootReactor.Consumer>
//                     )
//                 }
//             }

//         }
//     }
// }
//<Component {...this.props as P} getState={getState} dispatcher={dispatcher}></Component>
//MOBX
