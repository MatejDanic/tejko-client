import React, { Component } from "react";
import { withRouter } from "react-router";
import "./admin-data.css";

class AdminDataText extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            isEditing: false
        };

        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        let value = this.props.value;
        this.setState({ value });
    }

    handleChange() {
        let value = !this.state.value;
        this.setState({ value });
    }

    render() {
        let value = this.state.value;

        return (
            <input className="data-checkbox" type="checkbox" checked={value} onChange={this.handleChange}></input>
        )
    }
}

export default withRouter(AdminDataText);