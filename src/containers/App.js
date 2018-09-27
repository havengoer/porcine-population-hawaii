import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage.jsx';


class App extends Component {
 
  componentDidMount() {
  }
  render() {
    return (
      <BrowserRouter >
        <div>
          <Switch>
          <Route path="/?paused=true&year=2002" component={HomePage} />
          <Route path="/" component={HomePage} />
          </Switch> 
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
