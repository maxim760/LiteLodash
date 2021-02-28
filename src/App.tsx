import React from 'react';
import { Panel } from './components/Panel';
import { Main } from './components/Main';
import * as col from "./function/collection"
import * as func from "./function/function"
function App() {
  return (
    <div className="app">
        <Panel />
        <Main />
    </div>
  );
}

export default App;
