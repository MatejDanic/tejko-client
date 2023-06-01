import {Component} from "react"
import {Link} from "react-router-dom"
import "./settings.css"

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			theme: this.props.theme,
		}
		this.handleToggleTheme = this.handleToggleTheme.bind(this)
	}

	handleToggleTheme() {
		this.props.onToggleTheme()
	}

	render() {
		let theme = this.state.theme
		return (
			<div className="window">
				<div className="setting">
					Theme: <button onClick={this.handleToggleTheme}>{theme}</button>
				</div>
				<div className="setting">
					<Link to="/login">Login</Link>
				</div>
				<div className="setting">
					<Link to="/register">Register</Link>
				</div>
			</div>
		)
	}
}
