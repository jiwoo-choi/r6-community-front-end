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
  withRouter,
  Redirect,
} from "react-router-dom";

import { createPortal } from "react-dom";


import Page404 from './Component/@2Content/Page404/Page404';
import { ForumReactor } from './Component/@0ForumReactor';
import { ForumStateInitialState, Topic } from './Component/@0ForumReactor/ForumReactor';
import { values } from 'lodash';
import { deepDistinctUntilChanged } from 'jsreactorkit';
import { skip } from 'rxjs/operators';
import { Divider } from 'semantic-ui-react';
import { R6Login, R6Register } from './Component/@2Content/Login';
import R6Ajax from './Library/R6Ajax';

const ListComponent = lazy( () => import('./Component/@2Content/Contents/List/R6List'))
const EditorComponent = lazy( () =>  import('./Component/@2Content/Contents/Post/Edit/R6PostWrite'))
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

  reactor: ForumReactor;
  reactorControl: any;
  newTopic: Topic;

  constructor(props:RouteComponentProps){

    super(props);

    let regexp = new RegExp(`\/[a-z]{1,}|\/`);
    let pathname = this.props.location.pathname;
    let progressed = regexp.exec(pathname);
    let excuted = progressed ? progressed[0] : "/null";


    if (pathname === "/") {
      ForumStateInitialState.topic = "free" as Topic
    } else if ( !["free", "clan", "together", "tips"].includes(excuted.substr(1))) {
      this.props.history.push('/error/404');
    } else {
      ForumStateInitialState.topic = excuted.substr(1) as Topic
    }

    const splittedPathname = this.props.location.pathname.split('/');

    if (splittedPathname.length === 4) {
      if (splittedPathname[2] === "post") {
        ForumStateInitialState.mode = "view"
        ForumStateInitialState.postId = parseInt(splittedPathname[3]);
      }
    }


    if (splittedPathname.length === 3) {
      if (splittedPathname[2] === "editor") {
        ForumStateInitialState.mode = "edit"
      }
    }

    this.newTopic = ForumStateInitialState.topic;
    this.reactor = new ForumReactor(ForumStateInitialState);
    this.reactorControl = this.reactor.getReactorControl();

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

         <R6Navigation reactor={this.reactor}></R6Navigation>
         <R6Login reactor_control={this.reactorControl}></R6Login>

         <PADDER>
          <Switch>

              <Route path={["/","/:type"]}  exact >
                <ListComponent reactor={this.reactor}/>
              </Route>

              <Route path="/:style/post/:postid">
                <PostComponent reactor={this.reactor}/>
              </Route>

              <Route path="/:style/editor">
                <EditorComponent reactor={this.reactor}/>
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

