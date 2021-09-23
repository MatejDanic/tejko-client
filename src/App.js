import { React, Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import history from "./history/history";

import NavigationBar from './components/navigation/navigation-bar.component';
import './App.css';


export default class App extends Component {


  render() {
    return (
      <div>
        <NavigationBar />
        <Router history={history}>
          <title>Tejko Games</title>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/games" />
            <Route exact path="/users" />
            <Route exact path="/scores" />
          </Switch>

        </Router>
      </div >

    );
  };
}