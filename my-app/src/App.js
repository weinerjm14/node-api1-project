import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './Components/Home';
import UpdateUser from './Components/UpdateUser';

function App() {
  return (
    <section className='full-container'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/update-user' component={UpdateUser} />
        </Switch>
      </BrowserRouter>
    </section>
  );
}

export default App;
