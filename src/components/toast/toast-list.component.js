import React, { Component } from "react";
import Toast from "./toast.component";
import "./toast.css";

export default class ToastList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toastList: this.props.toastList
        };

        this.handleDeleteToast = this.handleDeleteToast.bind(this);
    }

    handleDeleteToast(id) {
        this.props.onDeleteToast(id);
    }

    render() {
        let toastList = this.state.toastList;

        return (
            <div className="toast-list">
                {toastList.map((toast, i) =>
                    <Toast key={i} toast={toast} id={i} onDeleteToast={this.handleDeleteToast} />
                )}
            </div>
        );
    }
}