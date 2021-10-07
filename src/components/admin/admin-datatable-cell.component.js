import { React, Component } from "react";
import { withRouter } from "react-router";

// const uuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

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

	componentDidUpdate() {
		if (this.state.cellValue == "matej") {
			console.log(this.state.isEditing, this.props.isEditingGlobal, this.props.isEditingLocal);
		}
	}

	handleClick() {
		if (!this.state.isEditing) {
			console.log("Cell: Click");
			let isEditing = true;
			this.setState({ isEditing }, () => {
				this.props.onLocalEdit();
			});
		}
	}

	handleChange(event) {
		let cellValueNew = event.target.value;
		this.setState({ cellValueNew });
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
