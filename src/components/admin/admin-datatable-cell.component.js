import { React, Component } from "react";
import { withRouter } from "react-router";
import AdminDataElement from "./data/admin-data-element.component";

// const uuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

class AdminDatatableCell extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cell: this.props.cell
		};

	}

	componentDidMount() {
		let cell = this.props.cell;
		this.setState({ cell });
	}

	render() {
		let cell = this.state.cell;
		let isEditingGlobal = this.props.isEditingGlobal
		let isEditingLocal = this.props.isEditingLocal

		return (
			<td>
				<AdminDataElement element={cell} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} onLocalEdit={this.props.onLocalEdit} />
			</td>
		);
	}

}

export default withRouter(AdminDatatableCell);
