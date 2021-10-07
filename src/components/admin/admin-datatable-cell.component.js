import { React, Component } from "react";
import { withRouter } from "react-router";

const uuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

class AdminDatatableCell extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cellValue: this.props.cell,
			cellValueNew: this.props.cell,
			isEditing: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		let cellValueNew = event.target.value;
		this.setState({ cellValueNew });
	}

	componentDidUpdate() {
		if (!this.props.isEditingGlobal && !this.props.isEditingLocal && this.state.isEditing) {
			let isEditing = false;
			this.setState({ isEditing });
		} else if (this.props.isEditingGlobal && !this.state.isEditing) {
			let isEditing = true;
			this.setState({ isEditing });
		}
	}

	handleClick() {
		if (uuid.test(this.state.cellValue)) {
			this.props.onClick(this.state.cellValue);
		} else {
			let isEditing = true;
			if (isEditing) this.props.onLocalEdit();
			this.setState({ isEditing });
		}
	}

	render() {
		let cellValue = this.state.cellValue;
		let cellValueNew = this.state.cellValueNew
		let isEditing = this.state.isEditing;

		return (
			<td onClick={this.handleClick}>
				{isEditing && typeof cellValue !== "boolean" ?
					<input className="admin-input" value={cellValueNew} onChange={(event) => this.handleChange(event)}></input> :
					<div className="container-admin-input">
						{(typeof cellValue === "boolean") ?
							<input type="checkbox" className="admin-input" checked={cellValue} onChange={() => this.setState({ cellValue: !cellValue })}></input> : cellValue}</div>}
			</td>

		);
	}

}

export default withRouter(AdminDatatableCell);
