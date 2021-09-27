import { React, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home.component";
import TopBar from './components/navigation/top-bar.component';
import Admin from './components/admin/admin.component';
import './App.css';


export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="top-bar-container">
          <TopBar />
        </div>
        <div className="page-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/games" component={Home} />
            <Route exact path="/users" component={Home} />
            <Route exact path="/scores" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route exact path="/login" component={Home} />
            <Route exact path="/register" component={Home} />
          </Switch>
        </div>
      </Router >
    );
  }

}