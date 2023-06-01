import {Component} from "react"
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import "./navigation.css"

class TopBar extends Component {
	constructor(props) {
		super(props)
		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout() {
		this.props.onLogout()
		this.props.history.push("/login")
	}

	render() {
		let currentUser = this.props.currentUser
		return (
			<div className="top-bar">
				<div className="top-bar-section top-bar-section-left">
					<Link to="/">Tejko</Link>
					{currentUser && currentUser.roles && currentUser.roles.includes("ADMIN") ? (
						<Link to="/admin">Admin</Link>
					) : (
						<div />
					)}
				</div>
				<div className="top-bar-section top-bar-section-middle">
					<input className="search-bar"></input>
				</div>
				<div className="top-bar-section top-bar-section-right">
					{currentUser
						? [
								<Link to="/profile">{currentUser.username}</Link>,
								<button onClick={this.handleLogout}>Logout</button>,
						  ]
						: [<Link to="/login">Login</Link>, <Link to="/register">Register</Link>]}
					<Link to="/settings">Settings</Link>
				</div>
			</div>
		)
	}
}

export default withRouter(TopBar)
