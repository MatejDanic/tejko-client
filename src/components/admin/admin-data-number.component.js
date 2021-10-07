import React, { Component } from "react";
import { withRouter } from "react-router";
import "./admin.css";

class AdminDataNumber extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: "",
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

export default withRouter(AdminDataNumber);