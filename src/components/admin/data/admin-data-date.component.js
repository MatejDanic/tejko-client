import React, { Component } from "react";
import { withRouter } from "react-router";
import "./admin-data.css";

class AdminDataDate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            isEditing: false
        };

    }

    componentDidMount() {
        let value = this.props.value;
        this.setState({ value });
    }

    render() {
        let value = this.state.value;

        return (
            <div>
                {value}
            </div>
        )
    }
}

export default withRouter(AdminDataDate);