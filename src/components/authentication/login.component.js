import React, { Component } from "react";
import { withRouter } from "react-router"
// components
import Popup from "../popup/popup.component";
// services
import AuthService from "../../services/auth.service";
// styles
import "./authentication.css";
// export default withRouter(connect(mapStateToProps, matchDispatchToProps)(class Login extends Com) {
class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			messages: [],
			showPopup: false
		};

		this.handleLogin = this.handleLogin.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	handleChangeUsername(event) {
		this.setState({ username: event.target.value });
	}

	handleChangePassword(event) {
		this.setState({ password: event.target.value });
	}

	togglePopup(messages) {
		this.setState({ showPopup: !this.state.showPopup, messages });
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
						let messages = [];
						messages.push(response.subject);
						messages.push(response.body);
						this.togglePopup(messages);
					} else {
						console.error(response);
					}
				});
		} else {
			this.togglePopup(messages);
		}
	}

	render() {
		let username = this.state.username;
		let password = this.state.password;
		let messages = this.state.messages;
		return (
			<div className="window">
				<div className="window-inner">
					<div className="window-top">
						<div>
							<div>Korisničko ime</div>
							<input type="text" placeholder="Unesite korisničko ime" name="username" id="username" autoComplete="username" onChange={this.handleChangeUsername} value={username} />
						</div>
						<div>
							<div>Lozinka</div>
							<input type="password" placeholder="Unesite lozinku" name="password" id="password" autoComplete="current-password" onChange={this.handleChangePassword} value={password} />
						</div>
					</div>
					<button className="window-button-primary window-button-primary-login" onClick={this.handleLogin}>Login</button>

					<div className="window-bottom">
						<div>
							Nemate račun?
						</div>
						<div>
							<button className="window-button-secondary window-button-secondary-login" onClick={() => this.props.history.push("/register")}>Registracija</button>
						</div>
					</div>
				</div>
				{this.state.showPopup && <Popup text={messages} onOk={this.togglePopup} />}
			</div >
		);
	}
}

export default withRouter(Login);
