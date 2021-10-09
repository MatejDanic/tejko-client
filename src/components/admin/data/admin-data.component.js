import React, { Component } from "react";
import { withRouter } from "react-router";
import Popup from "../../popup/popup.component";
import AdminService from "../../../services/admin.service";
import AdminDataElement from "./admin-data-element.component";
import "./admin-data.css";

class AdminData extends Component {

	constructor(props) {
		super(props);

		this.state = {
			item: undefined,
			headers: undefined,
			messages: [],
			resource: this.props.resource,
			id: this.props.match.params.id,
			isEditingGlobal: false,
			isEditingLocal: false
		};

		this.loadData = this.loadData.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleCancelEdit = this.handleCancelEdit.bind(this);
		this.handleLocalEdit = this.handleLocalEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		let resource = this.props.resource;
		let id = this.props.match.params.id;
		this.loadData(resource, id);
	}

	componentDidUpdate() {
		let resource = this.state.resource;
		if (resource !== this.props.resource) {
			let resource = this.props.resource;
			this.loadData(resource);
		}
	}

	loadData(resource, id) {
		console.log("Loading data...");
		AdminService.getItem(resource + "/" + id)
			.then(item => {
				let headers = [];
				for (let key in item) {
					headers.push(key);
				}
				this.setState({ resource, item, headers }, () => {
					console.log("Data loaded:", item);
				});
			})
			.catch(response => {
				if (response.type === "ERROR") {
					let messages = [];
					messages.push(response.subject);
					messages.push(response.body);
					this.togglePopup(messages);
				} else {
					console.error(response);
				}
			});
	}

	handleSave() {
		let rows = document.getElementsByTagName("tr");
		let headers = this.state.headers;
		let idRequestMap = {};
		for (let i = 1; i < rows.length; i++) {
			let row = rows[i];
			if (row.firstChild.firstChild.checked) {
				let cells = row.children;
				let id = cells[1].textContent;
				idRequestMap[id] = {};
				for (let j = 2; j < cells.length; j++) {
					let input = cells[j].getElementsByTagName("input")[0];
					if (input) {
						let value = undefined;
						if (input.type === "checkbox") {
							value = input.checked;
						} else if (input.type === "text") {
							value = input.value;
						}
						if (value !== undefined) {
							idRequestMap[id][headers[j - 1]] = value;
						}
					}
				}
			}
		}
		if (Object.keys(idRequestMap).length > 0) {
			let resource = this.state.resource;
			AdminService.updateItems(resource, JSON.stringify(idRequestMap))
				.then(response => {
					console.log(response);
					this.loadData(resource);
				})
				.catch(response => {
					if (response.type === "ERROR") {
						let messages = [];
						messages.push(response.subject);
						messages.push(response.body);
						this.togglePopup(messages);
					} else {
						console.error(response);
					}
				});
		}
	}

	handleEdit() {
		console.log("Edit")
		let isEditingGlobal = true;
		this.setState({ isEditingGlobal });
	}

	handleCancelEdit() {
		console.log("Cancel Edit")
		let isEditingGlobal = false;
		let isEditingLocal = false;
		this.setState({ isEditingGlobal, isEditingLocal });
	}

	handleLocalEdit() {
		console.log("Local Edit");
		let isEditingLocal = true;
		this.setState({ isEditingLocal });
	}

	handleDelete() {
		console.log("Delete");
		let rows = document.getElementsByTagName("tr");
		for (let i = 1; i < rows.length; i++) {
			if (rows[i].children[0].firstChild.checked) {
				console.log(rows[i].children[1].firstElementChild.textContent);
			}
		}
	}

	togglePopup(messages) {
		this.setState({ showPopup: !this.state.showPopup, messages });
	}

	render() {
		let item = this.state.item;
		let messages = this.state.messages;
		let isEditingLocal = this.state.isEditingLocal;
		let isEditingGlobal = this.state.isEditingGlobal;
		let isEditing = isEditingLocal || isEditingGlobal;

		return (
			<div>
				<div className="container-actions">
					<div className="container-actions-left">
						<button className="button button-save" onClick={() => window.location.reload()}>Refresh</button>
						{isEditing && <button className="button button-delete" onClick={this.handleCancelEdit}>Cancel</button>}
					</div>
					<div className="container-actions-right">
						{isEditing ? <button className="button button-save" onClick={this.handleSave}>Save</button> :
							<button className="button button-edit" onClick={this.handleEdit}>Edit</button>}
						<button className="button button-delete" onClick={this.handleDelete}>Delete</button>
					</div>
				</div>
				<div className="container-element">
					{item && <AdminDataElement element={item} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} onLocalEdit={this.handleLocalEdit} />}
				</div>
				{this.state.showPopup && <Popup text={messages} onOk={this.togglePopup} />}

			</div >
		);
	}
}

export default withRouter(AdminData);