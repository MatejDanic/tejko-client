import { React, Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import history from "./history/history";

import NavigationBar from './components/navigation/navigation-bar.component';
import './App.css';
import TejkoAdmin from './components/admin/tejko-admin.component';


export default class App extends Component {

  render() {

    return (
      <div>
        <NavigationBar />
        <Router history={history}>
          <title>Tejko Games</title>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/admin" component={TejkoAdmin} />
          </Switch>
        </Router>
      </div >
    );
  };
}