import React, { Component } from "react";
import { withRouter } from "react-router";
import AdminDataElement from "./admin-data-element.component";
import "./admin-data.css";

class AdminDataArray extends Component {

	constructor(props) {
		super(props);

		this.state = {
			array: []
		};

	}

	componentDidMount() {
		let array = this.props.array;
		this.setState({ array });
	}

	render() {
		let array = this.state.array;

		return (
			<ul className="data-array">
				{array.map(element =>
					<li key={element}>
						<AdminDataElement element={element} onLocalEdit={() => console.log("Ignore")} />
					</li>
				)}
			</ul >
		);
	}
}

export default withRouter(AdminDataArray);