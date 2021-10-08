import React, { Component } from "react";
import { withRouter } from "react-router";
import Popup from "../popup/popup.component";
import AdminService from "../../services/admin.service";
import AdminDatatableRow from "./admin-datatable-row.component";
import "./admin.css";

class AdminDatable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			items: [],
			headers: [],
			messages: [],
			resource: this.props.resource,
			isEditing: false,
			isEditingGlobal: false,
			isEditingLocal: false,
			allChecked: false
		};

		this.loadData = this.loadData.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleCancelEdit = this.handleCancelEdit.bind(this);
		this.handleLocalEdit = this.handleLocalEdit.bind(this);
		this.handleCheckAll = this.handleCheckAll.bind(this);
	}

	loadData(resource) {
		console.log("Loading data...");
		AdminService.getItems(resource)
			.then(items => {
				let headers = [];
				for (let key in items[0]) {
					if (!(items[0][key] instanceof Array)) {
						headers.push(key);
					}
				}
				let allChecked = false;
				let isEditing = false;
				console.log("Data Loaded", items);
				this.setState({ resource, items, headers, allChecked, isEditing }, () => {
					//this.handleCancelEdit();
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

	togglePopup(messages) {
		this.setState({ showPopup: !this.state.showPopup, messages });
	}

	componentDidMount() {
		let resource = this.props.resource;
		this.loadData(resource);
	}

	componentDidUpdate() {
		let resource = this.state.resource;
		if (resource !== this.props.resource) {
			let resource = this.props.resource;
			this.loadData(resource);
		}
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
		let isEditingGlobal = true;
		let isEditing = true;
		this.setState({ isEditing, isEditingGlobal });
	}

	handleCancelEdit() {
		let isEditing = false;
		let isEditingGlobal = false;
		let isEditingLocal = false;
		this.setState({ isEditing, isEditingGlobal, isEditingLocal });
	}

	handleLocalEdit() {
		let isEditingLocal = true;
		let isEditing = true;
		this.setState({ isEditing, isEditingLocal });
	}

	handleDelete() {
		let rows = document.getElementsByTagName("tr");
		let idList = [];
		for (let i = 1; i < rows.length; i++) {
			let row = rows[i];
			if (row.firstChild.firstChild.checked) {
				let cells = row.children;
				let id = cells[1].textContent;
				idList.push(id);
			}
		}
		console.log(JSON.stringify(idList));
	}

	handleCheckAll() {
		let allChecked = !this.state.allChecked;
		this.setState({ allChecked });
	}

	render() {
		let resource = this.state.resource;
		let items = this.state.items;
		let headers = this.state.headers;
		let messages = this.state.messages;
		let isEditingLocal = this.state.isEditingLocal;
		let isEditingGlobal = this.state.isEditingGlobal;
		let isEditing = this.state.isEditing;
		let allChecked = this.state.allChecked

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
				<div className="container-datatable">
					<table className="datatable">
						<thead>
							<tr>
								<th>
									<input className="admin-input" type="checkbox" checked={allChecked} onChange={this.handleCheckAll}></input>
								</th>
								{headers.map(header =>
									<th key={header}>
										{header}
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{items.map(item =>
								<AdminDatatableRow key={item[Object.keys(item)[0]]} resource={resource} item={item} headers={headers} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} allChecked={allChecked} onLocalEdit={() => this.handleLocalEdit()} />
							)}
						</tbody>
					</table>
				</div>
				{this.state.showPopup && <Popup text={messages} onOk={this.togglePopup} />}
			</div>
		);
	}
}

export default withRouter(AdminDatable);