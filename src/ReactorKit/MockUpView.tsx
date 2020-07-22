import { Reactor } from "./Reactor";
import React from 'react';
// import { Action, Action } from "rxjs/internal/scheduler/Action";
//목업뷰를 만들어주는방식 => 목업뷰대신 테스트를 하세요.ㄹㅇ루다가.
//
export function MockUpView<Action, State, Mutation>(
    reactor: Reactor<Action,State,Mutation>,
    actions: any[],
    mutations: any[],
    ) : React.ComponentClass {

    // console.log(reactor.)
    // type read all of the keys..
    // curret State
    // 리액터의 소스를 읽는데 
    // type a = keyof typeof Action;
    
    return class A extends React.Component {


        render(){
            return(
                <>
                <button></button>
                <button></button>
                </>
            )
        }
    }
}