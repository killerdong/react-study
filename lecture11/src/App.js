import React, { Component } from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import {About, Home, Contact, Events, Products, Whoops404 } from './component';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home}  />
            <Route path="/about" component={About}  />
            <Route exact path="/events/:name/:message" component={Events}  />
            <Route path="/events" component={() => <div>[그냥 이벤트]</div>}  />
            <Route path="/products" component={Products}  />
            <Route path="/contact" component={Contact}  />
            <Redirect from="/history" to="/about/history" />
            <Redirect from="/services" to="/about/services" />
            <Redirect from="/location" to="/about/location" />
            <Route component={Whoops404} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;

