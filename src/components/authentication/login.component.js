import React, { PureComponent } from "react";
import { withRouter } from "react-router"
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import "./authentication.css";

class Login extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};

		this.handleLogin = this.handleLogin.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
	}

	handleChangeUsername(event) {
		this.setState({ username: event.target.value });
	}

	handleChangePassword(event) {
		this.setState({ password: event.target.value });
	}

	validateForm(username, password) {
		let messages = [];
		if (!username) {
			messages.push("Korisničko ime je obavezno!");
		} else if (username.length < 3) {
			messages.push("Korisničko ime mora biti dulje od 3 znaka!");
		}
		if (!password) {
			messages.push("Lozinka je obavezna!");
		} else if (password.length < 3) {
			messages.push("Lozinka mora biti dulja od 3 znaka!");
		}
		return messages;
	}

	handleLogin() {
		let username = this.state.username;
		let password = this.state.password;
		let messages = this.validateForm(username, password);

		if (messages.length === 0) {
			let credentials = {}
			credentials.username = this.state.username;
			credentials.password = this.state.password;
			AuthService.login(JSON.stringify(credentials))
				.then(response => {
					if (response && response !== "undefined") {
						this.props.onLogin(JSON.stringify(response));
						this.props.history.push("/");
					} else {
						console.error(response);
					}
				})
				.catch(response => {
					if (response.type === "ERROR") {
						let toast = { title: "Error", message: response.content, type: "error" };
						this.props.onAddToast(toast);
					} else {
						console.error(response);
					}
				});
		}
	}

	render() {
		let username = this.state.username;
		let password = this.state.password;
		return (
			<div className="window">
				<input type="text" placeholder="username" name="username" id="username" autoComplete="username" onChange={this.handleChangeUsername} value={username} />
				<input type="password" placeholder="********" name="password" id="password" autoComplete="current-password" onChange={this.handleChangePassword} value={password} />
				<button onClick={this.handleLogin}>Log In</button>
				<Link to="/register" className="question">Don't have an account?</Link>
			</div >
		);
	}
}

export default withRouter(Login);
