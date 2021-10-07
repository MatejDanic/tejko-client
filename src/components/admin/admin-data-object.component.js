import React, { Component } from "react";
import { withRouter } from "react-router";
import AdminDataArray from "./admin-data-array.component";
import AdminDataText from "./admin-data-text.component";
import AdminDataNumber from "./admin-data-number.component";
import "./admin.css";

class AdminDataObject extends Component {

	constructor(props) {
		super(props);

		this.state = {
			object: undefined,
			keys: [],
			isEditing: false
		};

	}

	componentDidMount() {
		let object = this.props.object;
		let keys = Object.keys(object);
		if (!this.props.isEditingGlobal && !this.props.isEditingLocal && this.state.isEditing) {
			let isEditing = false;
			this.setState({ isEditing, object, keys });
		} else if (this.props.isEditingGlobal && !this.state.isEditing) {
			let isEditing = true;
			this.setState({ isEditing, object, keys });
		} else {
			this.setState({ object, keys });
		}
	}

	render() {
		let object = this.state.object;
		let keys = this.state.keys;
		let isEditing = this.state.isEditing;

		return (
			<div className="data-object">
				{keys.map(key =>
					<div key={key}>
						<div className="data-header">
							{key}:
						</div>
						<div className="data-value" onClick={this.props.onLocalEdit}>
							{(typeof (object[key]) === "string") &&
								<AdminDataText value={object[key]} isEditing={isEditing} />
							}
							{(typeof (object[key]) === "number") &&
								<AdminDataNumber value={object[key]} isEditing={isEditing} />
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