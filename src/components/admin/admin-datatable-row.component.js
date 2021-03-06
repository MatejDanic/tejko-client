import { React, Component } from "react";
import { withRouter } from "react-router";
import AdminDatatableCell from "./admin-datatable-cell.component";

class AdminDatatableRow extends Component {

	constructor(props) {
		super(props);

		this.state = {
			item: {},
			headers: [],
			checked: false,
			allChecked: this.props.allChecked
		};

		this.handleLocalEdit = this.handleLocalEdit.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		let item = this.props.item;
		let headers = this.props.headers;
		this.setState({ item, headers });
	}

	componentDidUpdate() {
		if (this.props.allChecked !== this.state.allChecked && this.props.allChecked !== this.state.checked) {
			let allChecked = this.props.allChecked;
			let checked = allChecked;
			this.setState({ checked, allChecked })
		}
	}

	handleLocalEdit() {
		this.props.onLocalEdit();
	}

	handleCheck() {
		let checked = !this.state.checked;
		this.setState({ checked });
	}

	handleClick(id) {
		this.props.history.push(this.props.resource + "/" + id);
	}

	render() {
		let item = this.state.item;
		let headers = this.state.headers;
		let isEditingGlobal = this.props.isEditingGlobal;
		let isEditingLocal = this.props.isEditingLocal;
		let checked = this.state.checked;

		return (
			<tr>
				<td><input className="admin-datatable-row-checkbox" type="checkbox" onChange={this.handleCheck} value={checked} checked={checked}></input></td>
				<td className="id" onClick={() => this.handleClick(item[headers[0]])}>{item[headers[0]]}</td>
				{headers.slice(1).map(key =>
					<AdminDatatableCell key={key} cell={item[key]} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} onLocalEdit={this.handleLocalEdit} />
				)}
			</tr>
		);
	}

}

export default withRouter(AdminDatatableRow);
