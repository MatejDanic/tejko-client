import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import "./authentication.css";

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			repeatPassword: "",
			successful: false
		};

		this.handleRegister = this.handleRegister.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
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
					} else {
						console.error(response);
					}
				});
		}
	}

	render() {
		let username = this.state.username;
		let password = this.state.password;
		let repeatPassword = this.state.repeatPassword;
		let messages = this.state.messages;
		return (
			<div className="window">

				<input type="text" placeholder="username" name="username" id="username" autoComplete="username" onChange={(event) => this.handleChangeUsername(event)} value={username} />
				<input type="password" placeholder="********" name="password" id="password" onChange={this.handleChangePassword} value={password} />
				<div className="repeat-password">Repeat Password</div>
				<input type="password" placeholder="********" name="repeatPassword" id="repeatPassword" onChange={this.onChangeRepeatPassword} value={repeatPassword} />
				<button onClick={this.handleRegister}>Register</button>
				<Link to="/login" className="question">Already have an account?</Link>
			</div>
		);
	}
}

export default withRouter(Register);