import React, { Component } from "react";
import { withRouter } from "react-router";
import AdminDataElement from "./admin-data-element.component";
import "./admin-data.css";

class AdminDataObject extends Component {

	constructor(props) {
		super(props);

		this.state = {
			object: {},
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
		let isEditing = this.props.isEditing;
		let isEditingGlobal = this.props.isEditingGlobal;
		let isEditingLocal = this.props.isEditingLocal;

		return (
			<table className="data-object">
				{keys.map(key =>
					<tr key={key} className="data-object-row">
						<div className="data-header">
							{key}:
						</div>
						<AdminDataElement element={object[key]} isEditing={isEditing} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} onLocalEdit={this.props.onLocalEdit} />
					</tr>
				)}
			</table >
		);
	}
}

export default withRouter(AdminDataObject);