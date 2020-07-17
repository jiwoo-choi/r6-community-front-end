import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { View, TestReactor } from './Reactor';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';


// test('abc', () => {
// })
//https://reactjs.org/docs/test-utils.html#renderintodocument
//https://engineering.pivotal.io/post/tdd-mobx/
//https://velog.io/@velopert/react-testing-with-enzyme


describe('1', () =>{


    it('reactor-testing', (done)=> {
        const reactor = new TestReactor({value:0});
        reactor.action.next({type:"INCREASE"})
        expect(reactor.currentState.value).toBe(1);
        done();
    })


    it('reactor-testing - 2', (done)=> {
        const reactor = new TestReactor({value:0});
        reactor.action.next({type:"INCREASE"})
        reactor.action.next({type:"DECREASE"})
        expect(reactor.currentState.value).toBe(0);
        done();
    })


    it('view->send action->reactor testing', ()=> {
        const reactor = new TestReactor({value:1}, true);
        const wrapper = shallow(<View/>);
        (wrapper.instance() as View).reactor = reactor;
        (wrapper.instance() as View).bind();
        (wrapper.instance() as View).viewAction?.next({type:"INCREASE"})
        expect(reactor.stub.actions[reactor.stub.actions.length-1]).toStrictEqual({type:"INCREASE"})
    })


    it('state->change->view->change', () => {
        const reactor = new TestReactor({value:1}, true);
        const wrapper = shallow(<View/>);
        (wrapper.instance() as View).reactor = reactor;
        (wrapper.instance() as View).bind();
        (wrapper.instance() as View).reactor?.stub.state.next({value:2});
        const result = (wrapper.state() as {value:number}).value;
        expect(result).toBe(2);
    })
   
})