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
			path: this.props.location.pathname.split("/")[2],
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

	loadData(path) {
		console.log("Loading data...");
		AdminService.getItems(path)
			.then(items => {
				let headers = [];
				for (let key in items[0]) {
					if (!(items[0][key] instanceof Array)) {
						headers.push(key);
					}
				}
				this.setState({ path, items, headers }, () => {
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
		this.loadData(this.props.location.pathname.split("/")[2]);
	}

	componentDidUpdate() {
		if (this.state.path !== this.props.location.pathname.split("/")[2]) {
			this.loadData(this.props.location.pathname.split("/")[2]);
		}
	}

	handleClick(id) {
		this.props.history.push(this.state.path + "/" + id);
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
						if (rows[i].children[j + 1].firstChild.firstChild.type === "checkbox") {
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
		let isEditingGlobal = true;
		this.setState({ isEditingGlobal });
	}

	handleCancelEdit() {
		let isEditingGlobal = false;
		let isEditingLocal = false;
		this.setState({ isEditingGlobal, isEditingLocal });
	}

	handleDelete() {
		if (this.state.allChecked) {
			console.log("allChecked");
		} else {
			let rows = document.getElementsByTagName("tr");
			for (let i = 1; i < rows.length; i++) {
				if (rows[i].children[0].firstChild.checked) {
					console.log(rows[i].children[1].firstElementChild.textContent);
				}
			}
		}
	}

	handleCheckAll() {
		let allChecked = !this.state.allChecked;
		this.setState({ allChecked });
	}

	handleLocalEdit() {
		let isEditingLocal = true;
		this.setState({ isEditingLocal });
	}

	render() {
		let items = this.state.items;
		let headers = this.state.headers;
		let messages = this.state.messages;
		let isEditingLocal = this.state.isEditingLocal;
		let isEditingGlobal = this.state.isEditingGlobal;
		let isEditing = isEditingLocal || isEditingGlobal;
		let allChecked = this.state.allChecked

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
				<table className="datatable">
					<thead>
						<tr>
							<th><input className="admin-input" type="checkbox" checked={allChecked} onChange={() => this.handleCheckAll()}></input></th>
							{headers.map(header =>
								<th key={header}>
									{header}
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{items.map(item =>
							<AdminDatatableRow key={item[Object.keys(item)[0]]} item={item} headers={headers} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} allChecked={allChecked} onClick={(id) => this.handleClick(id)} onLocalEdit={() => this.handleLocalEdit()} />
						)}
					</tbody>
				</table>
				{this.state.showPopup && <Popup text={messages} onOk={() => this.togglePopup()} />}
			</div>
		);
	}
}

export default withRouter(AdminDatable);