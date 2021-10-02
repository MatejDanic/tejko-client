import React, { Component } from "react";
import { withRouter } from "react-router";
import AuthService from "../../services/auth.service";
import Popup from "../popup/popup.component";
import "./authentication.css";

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			repeatPassword: "",
			successful: false,
			messages: []
		};

		this.handleRegister = this.handleRegister.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	handleChangeUsername(event) {
		this.setState({
			username: event.target.value
		});
	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	onChangeRepeatPassword(event) {
		this.setState({
			repeatPassword: event.target.value
		});
	}

	togglePopup(messages) {
		this.setState({ showPopup: !this.state.showPopup, messages });
	}

	handleRegister() {
		let username = this.state.username;
		let password = this.state.password;
		let repeatPassword = this.state.repeatPassword;
		let messages = [];
		if (!username) {
			messages.push("Korisničko ime je obavezno!");
		}
		if (!password) {
			messages.push("Lozinka je obavezna!");
		}
		if (repeatPassword !== password) {
			messages.push("Lozinke su različite!");
		}
		if (messages.length === 0) {
			let credentials = {}
			credentials.username = this.state.username;
			credentials.password = this.state.password;
			AuthService.register(JSON.stringify(credentials))
				.then(response => {
					if (response.type === "DEFAULT") {
						let messages = [];
						messages.push(response.subject);
						messages.push(response.body);
						this.togglePopup(messages);
						setTimeout(() => { this.props.history.push("/login") }, 1000);
					} else {
						console.log(response);
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
		let repeatPassword = this.state.repeatPassword;
		let messages = this.state.messages;
		return (
			<div className="window">
				<div className="window-inner">
					<div className="window-top">
						<div>
							<div>Korisničko ime</div>
							<input type="text" placeholder="Unesite korisničko ime" name="username" id="username" autoComplete="username" onChange={(event) => this.handleChangeUsername(event)} value={username} />
						</div>
						<div>
							<div>Lozinka</div>
							<input type="password" placeholder="Unesite lozinku" name="password" id="password" onChange={this.handleChangePassword} value={password} />
						</div>
						<div>
							<div>Ponovi lozinku</div>
							<input type="password" placeholder="Unesite lozinku" name="repeatPassword" id="repeatPassword" onChange={this.onChangeRepeatPassword} value={repeatPassword} />
						</div>
					</div>
					<button className="window-button-primary window-button-primary-register" onClick={this.handleRegister}>Register</button>

					<div className="window-bottom">
						<div>
							Imate račun?
						</div>
						<div>
							<button className="window-button-secondary window-button-secondary-register" onClick={() => this.props.history.push("/login")}>Login</button>
						</div>
					</div>
				</div>
				{this.state.showPopup && <Popup text={messages} onOk={this.togglePopup} />}
			</div>
		);
	}
}

export default withRouter(Register);