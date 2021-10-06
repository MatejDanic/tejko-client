import React, { Component } from "react";
import { withRouter } from "react-router";
import AdminDataObject from "./admin-data-object.component";
import "./admin.css";

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
			<div className="data-array">
				{array.map(element =>
					<div key={element} className="data-value">
						{(typeof (element) === "string") &&
							element
						}
						{(typeof (element) === "number") &&
							element
						}
						{(typeof (element) === "boolean") &&
							<input checked={element} readOnly={true}></input>
						}
						{(element instanceof Array) ?
							<AdminDataArray array={element} /> :
							element instanceof Object &&
							<AdminDataObject object={element} />
						}
					</div>

				)}
			</div >
		);
	}
}

export default withRouter(AdminDataArray);