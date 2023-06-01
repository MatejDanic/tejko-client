import {React, Component} from "react"
import {Link} from "react-router-dom"
import "./admin.css"

export default class AdminSideBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sideBarVisible: true,
		}
		this.toggleSideBar = this.toggleSideBar.bind(this)
	}

	toggleSideBar() {
		this.setState({sideBarVisible: !this.state.sideBarVisible})
	}

	render() {
		let sideBarClass = "side-bar side-bar-" + (this.state.sideBarVisible ? "visible" : "hidden")
		return (
			<div className={sideBarClass}>
				<button className="side-bar-button" onClick={this.toggleSideBar}>
					{this.state.sideBarVisible ? "<<" : ">>"}
				</button>
				<div className="side-bar-element">
					<Link to="/admin">Dashboard</Link>
				</div>
				<div className="side-bar-element">
					<Link to="/admin/apps">Apps</Link>
				</div>
				<div className="side-bar-element">
					<Link to="/admin/users">Users</Link>
				</div>
				<div className="side-bar-element">
					<Link to="/admin/roles">Roles</Link>
				</div>
				<div className="side-bar-element">
					<Link to="/admin/scores">Scores</Link>
				</div>
				<div className="side-bar-element">
					<Link to="/admin/yambs">Yambs</Link>{" "}
				</div>
				<div className="side-bar-element">
					<Link to="/admin/challenges">Challenges</Link>
				</div>
				<div className="side-bar-element">
					<Link to="/admin/logs">Logs</Link>
				</div>
			</div>
		)
	}
}
