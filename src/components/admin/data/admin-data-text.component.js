import React, { Component } from "react";
import { withRouter } from "react-router";
import "./admin-data.css";

class AdminDataText extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: "",
            valueNew: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let value = this.props.value;
        let valueNew = value;
        this.setState({ value, valueNew });
    }

    handleChange(event) {
        let valueNew = event.target.value;
        this.setState({ valueNew });
    }

    render() {
        let value = this.state.value;
        let valueNew = this.state.valueNew;
        let isEditing = this.props.isEditing;

        return (
            <div>
                {isEditing ? <input className="element-input" value={valueNew} onChange={this.handleChange}></input> : <div>{value}</div>}
            </div>
        )
    }
}

export default withRouter(AdminDataText);