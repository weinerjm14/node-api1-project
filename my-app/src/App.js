import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './Components/Home';
import UpdateUser from './Components/UpdateUser';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/update-user' component={UpdateUser} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
