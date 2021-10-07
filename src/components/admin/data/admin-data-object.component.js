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

		this.handleLocalEdit = this.handleLocalEdit.bind(this);
	}

	componentDidMount() {
		let object = this.props.object;
		let keys = Object.keys(object);
		this.setState({ object, keys });
	}

	handleLocalEdit() {
		console.log("Object: Local Edit");
		this.props.onLocalEdit();
	}

	render() {
		let object = this.state.object;
		let keys = this.state.keys;
		let isEditing = this.props.isEditing;
		let isEditingGlobal = this.props.isEditingGlobal;
		let isEditingLocal = this.props.isEditingLocal;

		return (
			<div className="data-object">
				{keys.map(key =>
					<div key={key}>
						<div className="data-header">
							{key}:
						</div>
						<AdminDataElement element={object[key]} isEditing={isEditing} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} onLocalEdit={this.handleLocalEdit} />
					</div>
				)}
			</div >
		);
	}
}

export default withRouter(AdminDataObject);