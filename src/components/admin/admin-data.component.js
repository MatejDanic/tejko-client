import React, { Component } from "react";
import { withRouter } from "react-router";
import Popup from "../popup/popup.component";
import AdminService from "../../services/admin.service";
import AdminDataObject from "./admin-data-object.component";
import "./admin.css";

class AdminData extends Component {

	constructor(props) {
		super(props);

		this.state = {
			items: [],
			headers: [],
			messages: [],
			object: this.props.object,
			id: this.props.match.params.id,
			isEditingGlobal: false,
			isEditingLocal: false
		};

		this.loadData = this.loadData.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleCancelEdit = this.handleCancelEdit.bind(this);
	}

	componentDidMount() {
		let object = this.props.object;
		let id = this.props.match.params.id;
		this.loadData(object, id);
	}

	loadData(object, id) {
		console.log("Loading data...");
		AdminService.getItem(object + "/" + id)
			.then(item => {
				let headers = [];
				for (let key in item) {
					headers.push(key);
				}
				this.setState({ item, headers }, () => {
					console.log("Data loaded!");
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
		if (this.state.allChecked) {
			console.log("allChecked");
		} else {
			let rows = document.getElementsByTagName("tr");
			let requests = [];
			for (let i = 1; i < rows.length; i++) {
				if (rows[i].children[0].firstChild.checked) {
					let id = rows[i].children[1].firstElementChild.textContent;
					let request = {};
					request[id] = {};
					for (let j = 1; j < this.state.headers.length; j++) {
						if (rows[i].children[j + 1].firstChild.firstChild && rows[i].children[j + 1].firstChild.firstChild.type === "checkbox") {
							request[id][this.state.headers[j]] = rows[i].children[j + 1].firstChild.firstChild.checked;
						} else if (rows[i].children[j + 1].firstElementChild.value) {
							request[id][this.state.headers[j]] = rows[i].children[j + 1].firstElementChild.value;
						} else if (rows[i].children[j + 1].firstElementChild.textContent) {
							request[id][this.state.headers[j]] = rows[i].children[j + 1].firstElementChild.textContent;
						}

					}
					requests.push(request);
				}
			}
			console.log(JSON.stringify(requests));
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

	handleDelete() {
		console.log("Delete");
		let rows = document.getElementsByTagName("tr");
		for (let i = 1; i < rows.length; i++) {
			if (rows[i].children[0].firstChild.checked) {
				console.log(rows[i].children[1].firstElementChild.textContent);
			}
		}
	}

	handleLocalEdit() {
		console.log("Local Edit");
		let isEditingLocal = true;
		this.setState({ isEditingLocal });
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
				<div className="admin-item">
					{item && <AdminDataObject object={item} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} onLocalEdit={() => this.handleLocalEdit()} />}
				</div>
				{this.state.showPopup && <Popup text={messages} onOk={this.togglePopup} />}

			</div >
		);
	}
}

export default withRouter(AdminData);