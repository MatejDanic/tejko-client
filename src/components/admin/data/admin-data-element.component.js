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
        this.handleLocalEdit = this.handleLocalEdit.bind(this);
    }

    componentDidMount() {
        let element = this.props.element;
        let isEditing = this.props.isEditing;
        let isEditingGlobal = this.props.isEditingGlobal;
        let isEditingLocal = this.props.isEditingLocal;
        this.setState({ element, isEditing, isEditingGlobal, isEditingLocal });
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
        if (!this.state.isEditing) {
            console.log("Element: Click");
            let isEditing = true;
            this.setState({ isEditing }, () => {
                this.props.onLocalEdit();
            });
        }
    }

    handleLocalEdit() {
        console.log("Element: Local Edit");
        this.props.onLocalEdit();
    }

    render() {
        let element = this.state.element;
        let isEditing = this.state.isEditing;
        let isEditingLocal = this.state.isEditingLocal;
        let isEditingGlobal = this.state.isEditingGlobal;

        return (
            <div>
                {(element instanceof Array) ?
                    <AdminDataArray array={element} /> :
                    element instanceof Object &&
                    <AdminDataObject object={element} isEditing={isEditing} isEditingGlobal={isEditingGlobal} isEditingLocal={isEditingLocal} onLocalEdit={this.handleLocalEdit} />
                }
                <div className="data-value" onClick={this.handleClick}>
                    {(typeof (element) === "string") &&
                        <AdminDataText value={element} isEditing={isEditing} />
                    }
                    {(typeof (element) === "number") &&
                        <AdminDataNumber value={element} isEditing={isEditing} />
                    }
                    {(typeof (element) === "boolean") &&
                        <AdminDataBoolean value={element} isEditing={isEditing} />
                    }
                </div>

            </div>
        )
    }
}

export default withRouter(AdminDataElement);