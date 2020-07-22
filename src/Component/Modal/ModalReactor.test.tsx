
import R6IDSearchStore from "./R6IDSearchStore";
import moxios from 'moxios'
import {API} from '../../Library/API'
import { stringify } from "querystring";
import {RANKBYREGION} from '../../Util/Entity'
import { when } from "mobx";
import { doesNotReject } from "assert";
import { R6StatAPI } from "../../Library/R6StatAPI";
import { map } from "rxjs/operators";
import { catchErrorJustReturn } from "../../Library/RxJsExtension";
import { forkJoin } from "rxjs";
import { ModalReactor } from "./ModalReactor";
import { mount } from "enzyme";
import R6Login1, {R6Login} from "./R6Login";
import React from "react";
import { ReactorView } from "../../ReactorKit/ReactiveView";


describe( "Modal Reactor Test", () => {

    let reactor : ModalReactor;

    it("View -> ACTION ", () => {
        // reactor = new ModalReactor({isOpened: false}, true);
        // const wrapper1 = mount(<R6Login globalReactor={reactor} globalState={{isOpened: false}}></R6Login>); 
        // reactor.action.next({type:"MODALTOGGLE"})
        // expect(reactor.stub?.lastAction).toBe({type:"MODALTOGGLE"})
        //v
        // 글로벌 테스트하는 방법
        //임의의 액션
        //글로벌뷰입니다.
        //글로벌에대한테스트르ㄹ어떻게할것인가?
        //action을 어떻게할것인가?
        //viewAction을 통해 넣어주세요.
        //테스트를 위해서는 viewAction을 구현해주세요!
        //
        //injected ;; global
    })
    
    it("ISOPENACTION -> CHANGE STATE", () => {
        reactor = new ModalReactor({isOpened: false});
        reactor.action.next({type:"MODALTOGGLE"})
        expect(reactor.currentState.isOpened).toBe(true);
    })



    it("State -> VIEW", () => {
        reactor = new ModalReactor({isOpened: false}, true);
        const wrapper = mount(<R6Login globalReactor={reactor} globalState={reactor.currentState}></R6Login>); 
        
        //dummy로 세우는 방법이 있습니다.
        //dummy
        // d안에다 감싸주는역할
        // (wrapper.instance() as any).reactor = reactor
        // reactor.stub?.state.next({isOpened: true})
        // console.log((wrapper.instance() as any).childState);
        // const result = (wrapper.state() as {globalState : {isOpened:boolean}}).globalState.isOpened;
        // // expect(result).toBe(true);
    })


    test("VIEW->REACTOR", () => {


    })

    test("REACTOR", () => {
    })
})

//테스팅라이브러리지원
//Global일경우 깝니다.
//Global(), getCoreInstance()
//getWrapper() 랩퍼를 무시합니다.
//Globaldlfrudd
//enzyme을 기반으로한 간단한 
/**
 * mount를 하게되면 mount이 완료됩니다.
 * 글로벌 랩퍼를 깔고있다면?
 * 
 * 전용 테스팅을 할 수있는 테스트킷도 만들었습니다.
 * 테스트킷은 간단합니다.
 * 
 * 뷰를 마운팅시켰을때, 뷰가 래퍼로 감싸져있다면 instance를 가져오는 간단한 랩퍼입니다.
 * 
 */