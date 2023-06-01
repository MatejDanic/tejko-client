import {Component} from "react"
import {Link} from "react-router-dom"
import "./navigation.css"

export default class Menu extends Component {
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
			<div className="menu">
				<div className="menu-element">
					<Link to="/">Tejko</Link>
				</div>

				<div className="menu-element">
					{currentUser && currentUser.roles && currentUser.roles.includes("ADMIN") ? (
						<Link to="/admin">Admin</Link>
					) : (
						<div />
					)}
				</div>

				<div className="menu-element">
					{currentUser ? <Link to="/profile">{currentUser.username}</Link> : <Link to="/login">login</Link>}
				</div>
				<div className="menu-element">
					<Link to="/settings">Settings</Link>
				</div>
			</div>
		)
	}
}
