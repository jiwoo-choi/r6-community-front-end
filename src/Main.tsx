import React, { useState, Suspense, lazy } from 'react';
import './App.css';

import styled from 'styled-components'
// import { ModalReactor } from './Component/Modal/ModalReactor';

import { 
  R6Navigation, 
  R6Footer
} from './Component';

import { createPortal } from "react-dom";


import Page404 from './Component/@2Content/Page404/Page404';
import { values } from 'lodash';
import { deepDistinctUntilChanged } from 'jsreactorkit';
import { skip } from 'rxjs/operators';
import { Divider, Portal } from 'semantic-ui-react';
import { R6Login, R6Register } from './Component/@2Content/Login';
import R6Ajax from './Library/R6Ajax';


import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  withRouter,
  Redirect,
} from "react-router-dom";



const ListComponent = lazy( () => import('./Component/@2Content/Contents/List/R6List'))
const EditorComponent = lazy( () =>  import('./Component/@2Content/Contents/Post/Edit/R6Editor'))
const PostComponent = lazy( () =>  import('./Component/@2Content/Contents/Post/View/R6Post'))

const SECTIONWRAPPER = styled.div`
  min-height:90vh;
`




const PADDER = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`





class Main extends React.PureComponent<RouteComponentProps> {


  constructor(props:RouteComponentProps){

    super(props);
    
    // let regexp = new RegExp(`\/[a-z]{1,}|\/`);
    // let pathname = this.props.location.pathname;
    // let progressed = regexp.exec(pathname);
    // let excuted = progressed ? progressed[0] : "/null";


    // if (pathname === "/") {
    //   ForumStateInitialState.topic = "free" as Topic
    // } else if ( !["free", "clan", "together", "tips"].includes(excuted.substr(1))) {
    //   this.props.history.push('/error/404');
    // } else {
    //   ForumStateInitialState.topic = excuted.substr(1) as Topic
    // }

    // const splittedPathname = this.props.location.pathname.split('/');

    // if (splittedPathname.length === 4) {
    //   if (splittedPathname[2] === "post") {
    //     ForumStateInitialState.postId = parseInt(splittedPathname[3]);
    //   }
    // }


    // // if (splittedPathname.length === 3) {
    // //   if (splittedPathname[2] === "editor") {
    // //   }
    // // }

    // this.newTopic = ForumStateInitialState.topic;
    // this.reactor = new ForumReactor(ForumStateInitialState);
    // this.reactorControl = this.reactor.getReactorControl();

  }

  componentDidMount(){
    // this.reactor.dispatch({type:"CLICKTOPIC", newTopic:this.newTopic})
  }

  /** url정리 및 PRomps기능
   * https://reactrouter.com/web/example/query-parameters
   */

  render(){
    return(
      <React.Fragment>
         <R6Navigation></R6Navigation>
         <R6Login></R6Login>
         <PADDER>
          <Switch>

              <Route path={["/","/:type"]}  exact >
                <ListComponent/>
              </Route>

              <Route path="/:style/post/:postid">
                <PostComponent/>
              </Route>

              <Route path="/:style/editor">
                <EditorComponent/>
              </Route>

              <Route path="*">
                <Page404></Page404>
              </Route>

              <Route path="/error/404">
                <Page404></Page404>
              </Route>
          </Switch>
        </PADDER>
     </React.Fragment>
   );
  }
}

export default withRouter(Main);

