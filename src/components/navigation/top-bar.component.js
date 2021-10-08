import { React, Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./navigation.css";

class TopBar extends Component {

	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		this.props.onLogout();
		this.props.history.push("/login");
	}

	render() {
		let currentUser = this.props.currentUser;

		return (
			<div className="top-bar">
				<div className="top-bar-left">
					<Link to="/" className="top-bar-element">Home</Link>
					{/* <Link to="/games" className="top-bar-element">Games</Link>
					<Link to="/users" className="top-bar-element">Users</Link>
					<Link to="/scores" className="top-bar-element">Scores</Link> */}
				</div>
				<div className="top-bar-right">
					{currentUser && currentUser.roles && currentUser.roles.includes("ADMIN") &&
						<Link to="/admin" className="top-bar-element">Admin</Link>
					}
					{currentUser ?
						<div className="top-bar-element" onClick={this.handleLogout}>Logout</div> :
						<Link to="/login" className="top-bar-element">Login</Link>
					}
					{!currentUser &&
						<Link to="/register" className="top-bar-element">Register</Link>
					}
				</div>
			</div >
		);
	}
}

export default withRouter(TopBar);