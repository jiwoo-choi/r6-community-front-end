import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import R6Editor from './Component/R6Editor';
import R6IDSearchStore from './Component/R6IDSearchStore';
import R6Comment from './Component/R6Comment';
import { commentMockup } from './Data/mockup';
import R6List from './Component/R6List';
function App() {

  const store = new R6IDSearchStore();
  // const EditorStore = new R6EditorStore();
  return (
    <div className="App">
      {/* <R6Editor store={store}></R6Editor> */}
      {/* <R6Comment comments={commentMockup}></R6Comment> */}
      <R6List></R6List>
    </div>
  );
}

export default App;
