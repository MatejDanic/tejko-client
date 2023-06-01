import { React, Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import TopBar from "./components/navigation/top-bar.component"
import Home from "./components/home.component"
import Settings from "./components/settings/settings.component"
import Admin from "./components/admin/admin.component"
import Login from "./components/authentication/login.component"
import Register from "./components/authentication/register.component"
import ToastList from "./components/toast/toast-list.component"
import UserList from "./components/board/user-list.component"
import AuthService from "./services/auth.service"
import Menu from "./components/navigation/menu.component"
import "./App.css"

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentUser: undefined,
			showAdmin: false,
			theme:
				localStorage.getItem("theme") ??
				(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
			toastList: [],
		}

		this.handleLogout = this.handleLogout.bind(this)
		this.handleToggleTheme = this.handleToggleTheme.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleAddToast = this.handleAddToast.bind(this)
		this.handleDeleteToast = this.handleDeleteToast.bind(this)
	}

	componentDidMount() {
		this.setCurrentUser()
	}

	handleLogout() {
		localStorage.removeItem("user")
		this.setCurrentUser()
	}

	handleToggleTheme() {
		let theme = this.state.theme === "light" ? "dark" : "light"
		this.setState({theme}, () => {
			localStorage.setItem("theme", theme)
		})
	}

	handleLogin(user) {
		localStorage.setItem("user", user)
		this.setCurrentUser()
		// setTimeout(() => { this.sendMessage("/greeting", "Hello", null, null); }, 1000);
	}

	setCurrentUser() {
		let currentUser = AuthService.getCurrentUser()
		this.setState({currentUser})
	}

	handleAddToast(toast) {
		let toastList = this.state.toastList
		toastList.push(toast)
		this.setState({toastList})
	}

	handleDeleteToast(id) {
		let toastList = this.state.toastList
		toastList.splice(id, 1)
		this.setState({toastList})
	}

	render() {
		let currentUser = this.state.currentUser
		let theme = this.state.theme
		let toastList = this.state.toastList

		return (
			<div data-theme={theme} className="App container-page">
				<Router>
					<TopBar onLogout={() => this.handleLogout()} currentUser={currentUser} />
					<Menu onLogout={() => this.handleLogout()} currentUser={currentUser} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route
							exact
							path="/settings"
							component={() => <Settings onToggleTheme={this.handleToggleTheme} theme={theme} />}
						/>
						<Route exact path="/games" component={Home} />
						<Route exact path="/users" component={UserList} />
						<Route exact path="/scores" component={Home} />
						<Route path="/admin" component={Admin} />
						<Route
							exact
							path="/login"
							component={() => <Login onLogin={this.handleLogin} onAddToast={this.handleAddToast} />}
						/>
						<Route exact path="/register" component={Register} />
					</Switch>
					<ToastList toastList={toastList} onDeleteToast={this.handleDeleteToast} />
				</Router>
			</div>
		)
	}
}