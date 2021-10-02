import { React, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home.component";
import TopBar from './components/navigation/top-bar.component';
import Admin from './components/admin/admin.component';
import Login from './components/authentication/login.component';
import Register from './components/authentication/register.component';
import AuthService from './services/auth.service';
import './App.css';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentUser: undefined,
			showAdmin: false
		};
		this.handleLogout = this.handleLogout.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {
		this.setCurrentUser();
	}

	handleLogout() {
		localStorage.removeItem("user");
		this.setCurrentUser();
	}

	handleLogin(user) {
		localStorage.setItem("user", user);
		this.setCurrentUser();
		// setTimeout(() => { this.sendMessage("/greeting", "Hello", null, null); }, 1000);
	}

	setCurrentUser() {
		let currentUser = AuthService.getCurrentUser();
		this.setState({ currentUser });
	}

	render() {
		let currentUser = this.state.currentUser;

		return (
			<Router>
				<div className="container-top-bar">
					<TopBar onLogout={() => this.handleLogout()} currentUser={currentUser} />
				</div>
				<div className="container-page">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/games" component={Home} />
						<Route exact path="/users" component={Home} />
						<Route exact path="/scores" component={Home} />
						<Route path="/admin" component={Admin} />
						<Route exact path="/login" component={() => <Login onLogin={this.handleLogin} />} />
						<Route exact path="/register" component={Register} />
					</Switch>
				</div>
			</Router >
		);
	}

}