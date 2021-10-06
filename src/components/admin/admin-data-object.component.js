import React, { Component } from "react";
import { withRouter } from "react-router";
import AdminDataArray from "./admin-data-array.component";
import "./admin.css";

class AdminDataObject extends Component {

	constructor(props) {
		super(props);

		this.state = {
			object: undefined,
			keys: []
		};

	}

	componentDidMount() {
		let object = this.props.object;
		let keys = Object.keys(object);
		this.setState({ object, keys });
	}

	render() {
		let object = this.state.object;
		let keys = this.state.keys;

		return (
			<div className="data-object">
				{keys.map(key =>
					<div key={key}>
						<div className="data-header">
							{key}:
						</div>
						<div className="data-value">
							{(typeof (object[key]) === "string") &&
								object[key]
							}
							{(typeof (object[key]) === "number") &&
								object[key]
							}
							{(typeof (object[key]) === "boolean") &&
								<input className="data-checkbox" type="checkbox" checked={object[key]} readOnly={true}></input>
							}
							{(object[key] instanceof Array) ?
								<AdminDataArray array={object[key]} /> :
								object[key] instanceof Object &&
								<AdminDataObject object={object[key]} />
							}
						</div>
					</div>

				)
				}
			</div >
		);
	}
}

export default withRouter(AdminDataObject);