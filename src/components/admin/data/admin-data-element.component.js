import React, { Component } from "react";
import { withRouter } from "react-router";
import AdminDataObject from "./admin-data-object.component";
import AdminDataArray from "./admin-data-array.component";
import AdminDataText from "./admin-data-text.component";
import AdminDataNumber from "./admin-data-number.component";
import AdminDataBoolean from "./admin-data-boolean.component";
// import AdminDataDate from "./admin-data-date.component";
import "./admin-data.css";

class AdminDataElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            element: undefined,
            isEditing: false,
            isEditingGlobal: false,
            isEditingLocal: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let element = this.props.element;
        let isEditing = this.props.isEditing;
        let isEditingGlobal = this.props.isEditingGlobal;
        let isEditingLocal = this.props.isEditingLocal;
        this.setState({ element, isEditing, isEditingGlobal, isEditingLocal });
    }

    componentDidUpdate() {
        if (this.state.isEditing && !this.props.isEditingGlobal && !this.props.isEditingLocal) {
            let isEditing = false;
            this.setState({ isEditing });
        } else if (!this.state.isEditing && this.props.isEditingGlobal) {
            let isEditing = true;
            this.setState({ isEditing })
        }
    }

    handleClick() {
        if (!this.state.isEditing) {
            this.props.onLocalEdit()
            let isEditing = true;
            this.setState({ isEditing });
        }
    }

    render() {
        let element = this.state.element;
        let isEditing = this.state.isEditing;
        let isEditingLocal = this.props.isEditingLocal;
        let isEditingGlobal = this.props.isEditingGlobal;

        return (
            <div className="container-data-value">
                {(element instanceof Array) ?
                    <AdminDataArray array={element} /> :
                    element instanceof Object &&
                    <AdminDataObject object={element} isEditing={isEditing} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} onLocalEdit={this.props.onLocalEdit} />
                }
                <div onClick={this.handleClick}>
                    {(typeof (element) === "string") &&
                        <AdminDataText value={element} isEditing={isEditing} />
                    }
                    {(typeof (element) === "number") &&
                        <AdminDataNumber value={element} isEditing={isEditing} />
                    }
                    {(typeof (element) === "boolean") &&
                        <AdminDataBoolean value={element} isEditing={isEditing} />
                    }
                    {(element == null) &&
                        <AdminDataText value={element} isEditing={isEditing} />
                    }
                </div>

            </div>
        )
    }
}

export default withRouter(AdminDataElement);