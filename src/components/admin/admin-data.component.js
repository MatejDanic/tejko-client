import React, { Component } from "react";
import { withRouter } from "react-router";
import Popup from "../popup/popup.component";
import AdminService from "../../services/admin.service";
import "./admin.css";

class AdminData extends Component {

	constructor(props) {
		super(props);

		this.state = {
			items: [],
			headers: [],
			messages: [],
			path: this.props.location.pathname.split("/")[2] + "/" + this.props.match.params.id,
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
	}

	loadData(path) {
		console.log("Loading data...");
		AdminService.getItem(path)
			.then(item => {
				let headers = [];
				for (let key in item) {
					headers.push(key);
				}
				this.setState({ path, item, headers }, () => {
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

	togglePopup(messages) {
		this.setState({ showPopup: !this.state.showPopup, messages });
	}

	componentDidMount() {
		let path = this.props.location.pathname.split("/")[2] + "/" + this.props.match.params.id;
		this.loadData(path);
	}

	componentDidUpdate() {
		let path = this.props.location.pathname.split("/")[2] + "/" + this.props.match.params.id;
		if (this.state.path !== path) {
			this.loadData(path);
		}
	}

	handleSave() {
		console.log("Save")
		// let rows = document.getElementsByTagName("tr");
		// let requests = [];
		// for (let i = 1; i < rows.length; i++) {
		// 	if (rows[i].children[0].firstChild.checked) {
		// 		let id = rows[i].children[1].firstElementChild.textContent;
		// 		let request = {};
		// 		request[id] = {};
		// 		for (let j = 1; j < this.state.headers.length; j++) {
		// 			if (rows[i].children[j + 1].firstChild.firstChild.type === "checkbox") {
		// 				request[id][this.state.headers[j]] = rows[i].children[j + 1].firstChild.firstChild.checked;
		// 			} else if (rows[i].children[j + 1].firstElementChild.value) {
		// 				request[id][this.state.headers[j]] = rows[i].children[j + 1].firstElementChild.value;
		// 			} else if (rows[i].children[j + 1].firstElementChild.textContent) {
		// 				request[id][this.state.headers[j]] = rows[i].children[j + 1].firstElementChild.textContent;
		// 			}

		// 		}
		// 		requests.push(request);
		// 	}
		// }
		// console.log(JSON.stringify(requests));
	}

	handleEdit() {
		let isEditing = true;
		this.setState({ isEditing });
	}

	handleCancelEdit() {
		let isEditing = false;
		this.setState({ isEditing });
	}

	handleDelete() {
		console.log("Delete");
	}

	render() {
		let headers = this.state.headers;
		let messages = this.state.messages;
		let isEditingLocal = this.state.isEditingLocal;
		let isEditingGlobal = this.state.isEditingGlobal;
		let isEditing = isEditingLocal || isEditingGlobal;
		let item = this.state.item;

		return (
			<div>
				<div className="container-actions">
					<div className="container-actions-left">
						<button className="button button-save" onClick={() => window.location.reload()}>Refresh</button>
						{isEditing && <button className="button button-delete" onClick={() => this.handleCancelEdit()}>Cancel</button>}
					</div>
					<div className="container-actions-right">
						{isEditing ? <button className="button button-save" onClick={() => this.handleSave()}>Save</button> :
							<button className="button button-edit" onClick={() => this.handleEdit()}>Edit</button>}
						<button className="button button-delete" onClick={() => this.handleDelete()}>Delete</button>
					</div>
				</div>
				<div className="admin-item">{item && <div>{item.id}</div>}</div>
				{this.state.showPopup && <Popup text={messages} onOk={() => this.togglePopup()} />}

			</div >
		);
	}
}

export default withRouter(AdminData);