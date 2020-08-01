import React, { useState, Suspense, lazy } from 'react';
import './App.css';

import styled from 'styled-components'
// import { ModalReactor } from './Component/Modal/ModalReactor';

import { 
  R6Navigation, 
  R6Footer
} from './Component';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import Page404 from './Component/@2Content/Page404/Page404';
import { ForumReactor } from './Component/@0ForumReactor';
import { ForumStateInitialState, Topic } from './Component/@0ForumReactor/ForumReactor';
import { values } from 'lodash';
import { deepDistinctUntilChanged } from 'jsreactorkit';
import { skip } from 'rxjs/operators';

const ListComponent = lazy( () => import('./Component/@2Content/Contents/List/R6List'))
const PostComponent = lazy( () =>  import('./Component/@2Content/Contents/List/R6List'))

const SECTIONWRAPPER = styled.div`
  min-height:90vh;
`




const PADDER = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`




class Main extends React.PureComponent<RouteComponentProps, { currentTopic: Topic }> {

  reactor: ForumReactor;
  reactorControl: any;

  constructor(props:RouteComponentProps){
    super(props);
    this.reactor = new ForumReactor(ForumStateInitialState);
    this.reactorControl = this.reactor.getReactorControl();
    this.state = { currentTopic: ForumStateInitialState.topic }
  }


  componentDidMount(){
    //hot observable만들기?
    //변경한다? this props
    this.reactor.dispatch({type:"CLICKTOPIC", newTopic:"free"})
    
    // this.reactor.fireImmediately(
    //   (value) => { return value.type === "TOPICCHANGE"}, 
    //   (result) => {
    //     if (result.type === "TOPICCHANGE") {
    //       this.setState({currentTopic: result.topic}, () => {
    //         this.props.history.push(`/${result.topic}`)
    //       })
    //     }
    //   })


  }

  render(){
    return(
      <React.Fragment>
         <R6Navigation reactor_control={this.reactorControl}></R6Navigation>
         <PADDER>
          <Switch>
              <Route path={["/", "/free"]} exact key="free">
                <ListComponent reactor_control={this.reactorControl}/>
              </Route>

              <Route path="/tips" exact>
                <ListComponent reactor_control={this.reactorControl}/>
              </Route>

              <Route path="/together" exact>
                <ListComponent reactor_control={this.reactorControl}/>
              </Route>

              <Route path="/clan" exact>
                <ListComponent reactor_control={this.reactorControl}/>
              </Route>

              <Route>
                <Page404></Page404>
              </Route>
        </Switch>
       </PADDER>
     </React.Fragment>
   );
    
  }
    

}

export default withRouter(Main);
//const reactor = new ForumReactor(ForumStateInitialState)
//const reactorControls = reactor.getReactorControl();


// <Router>
// 
//   <Switch>
//     <App></App>
//         {/* <Route path="/" exact component={Landing}/>
//         <Route path="/login" exact component={Login}/>
//         <Route path="/signup" exact component={SignUp}/>
//         <Route path="/signup/result" exact component={SignUpResult}/>
//         <Route path="/search/:searchTerm" component={Search}/> */}
//         {/* <Route component={createErrorPageComponent('antd', 404)}></Route> */}
//         {/* <App /> */}
//   </Switch>
// </Router>

// <div className="App">
// {/* <R6Navigation></R6Navigation>
//     <SECTIONWRAPPER>
//       <R6Forum></R6Forum>
//     </SECTIONWRAPPER>
//     <R6Login stater={registerSetter}></R6Login>
//   <R6Footer></R6Footer> */}
//   {/* <R6Login loginStater={loginSetter} stater={registerSetter}></R6Login> */}
//   {/* <R6Register stater={registerSetter}></R6Register> */}
//   {/* <R6Confirmation></R6Confirmation> */}
//   {/* <R6Confirmation></R6Confirmation> */}
// { registerState === 0 && 
//   <>
//     <R6Navigation stater={loginSetter}></R6Navigation>
//     <SECTIONWRAPPER>
//       <R6Forum></R6Forum>
//     </SECTIONWRAPPER>
//     { loginState && 
//       <R6Login loginStater={loginSetter} stater={registerSetter}></R6Login>
//     } 
//     <R6Footer></R6Footer>
//   </>
// } 
// { registerState === 1 &&
//   <R6Register stater={registerSetter}></R6Register>
// }
// </div>

