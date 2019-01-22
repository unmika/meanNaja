import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Promotion from './containers/promotion/Promotion';
import Calculator from './containers/calculator/Calculate';

class App extends Component {
  renderRouter = () => {
    return(
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/promotion" component={Promotion}/>
        <Route path="/calculator" component={Calculator}/>
      </Switch>
    );
  }
  render() {
    return (
      <BrowserRouter>{this.renderRouter()}</BrowserRouter>
    );
  }
}

export default App;
