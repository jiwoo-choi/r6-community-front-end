import React, { Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import 'moment/locale/ko'
import Main from './Main';
import * as serviceWorker from './serviceWorker';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import './index.css';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import { Router, Switch, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';


import { R6Register, R6RegisterConfirmation } from './Component/@2Content/Login';
import { R6Footer } from './Component/@3Footer';
import R6Comment from './Component/@2Content/Contents/Post/View/R6Comment';
import RootStore from './Component/Stores/RootStore';
import styled from 'styled-components';


const browserHistory = createBrowserHistory();
const rootStore = new RootStore();
const history = syncHistoryWithStore(browserHistory, rootStore.router);
const WRPAPER = styled.div`
  display: block;
  margin: 0; padding: 0;
  min-height: 800px; /*푸터를 위해*/
  position: relative; /*푸터를 위해*/
  width: 100%; 
`

ReactDOM.render(
  <>
    <Provider {...rootStore}>

      <Router history={history}>
        <Suspense fallback={ <div>loading...</div>}>
          <Switch>
            <Route path="/register" exact>
                  <R6Register></R6Register>
            </Route>
            <WRPAPER> 
              <Main/>
            </WRPAPER>
          </Switch>
          <R6Footer></R6Footer>
        </Suspense>
      </Router>

    </Provider>
  </>
,
  document.getElementById('root')
);

// <React.StrictMode>

// </React.StrictMode>,

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

