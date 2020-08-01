import React, { Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import Main from './Main';
import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import GlobalLoading from './GlobalLoading';

// works like global reactor.
// consider using that


ReactDOM.render(
  <>
    <Router>
      <Suspense fallback={ <div>loading...</div>}>
        <Main/>
      </Suspense>
    </Router>
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

