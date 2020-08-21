
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import React from 'react'
import { when } from 'mobx'
import IDSearchStore from './IDSearchStore'

describe('id search', () => {

    let idStore: IDSearchStore;

    beforeEach( ()=> {
        idStore = new IDSearchStore();
    })
    
    it( 'string' , done => {

        done();
        // when( ()=>true,
        // ()=>{
        //     idStore.search.next("abcdefg");
        // })
    
    })
// const history = createMemoryHistory()
    // const { container, getByText } = render(
    //     <Router history={history}>
    //       {/* <App /> */}
    //     </Router>
    // )


    
})