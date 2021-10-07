import { React, Component } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

export default class SideBar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false
		};

		this.toggleSideBar = this.toggleSideBar.bind(this);

	}

	toggleSideBar() {
		let open = !this.state.open;
		this.setState({ open });
	}

	render() {
		let open = this.state.open;
		let sideBarWidthClass = open ? "side-bar-open" : "side-bar-closed";
		return (
			<div>
				{open ?
					<div className="container-side-bar">
						<div className={"side-bar " + sideBarWidthClass}>
							<Link to="/admin" className="side-bar-element">Dashboard</Link>
							<Link to="/admin/games" className="side-bar-element">Games</Link>
							<Link to="/admin/users" className="side-bar-element">Users</Link>
							<Link to="/admin/roles" className="side-bar-element">Roles</Link>
							<Link to="/admin/scores" className="side-bar-element">Scores</Link>
							<Link to="/admin/yambs" className="side-bar-element">Yambs</Link>
							<Link to="/admin/challenges" className="side-bar-element">Challenges</Link>
							<Link to="/admin/errors" className="side-bar-element">Errors</Link>
						</div>
						<div className="side-bar-mask" onClick={this.toggleSideBar} />
					</div>
					:
					<button className="button-side-bar" onClick={this.toggleSideBar}>| | |</button>
				}
			</div>
		);
	}

}