import React, { Component } from "react";
import "./toast.css";

export default class Toast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toast: this.props.toast,
            id: this.props.id
        };
        this.handleDeleteToast = this.handleDeleteToast.bind(this);
    }

    handleDeleteToast() {
        this.props.onDeleteToast(this.state.id);
    }

    render() {
        let toast = this.state.toast;

        return (
            <div className={"toast toast-" + toast.type}>
                <div className="toast-top">
                    <button className="toast-button" onClick={this.handleDeleteToast}>
                        X
                    </button>
                    <div className="toast-title">{toast.title}</div>
                </div>
                <div className="toast-bottom">
                    <div className="toast-message">{toast.message}</div>

                    <div className="toast-image">
                        <img src={toast.icon} alt="" />
                    </div>
                </div>
            </div >
        );
    }
}