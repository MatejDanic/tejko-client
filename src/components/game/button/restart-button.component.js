import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import FormService from "../../../services/form.service";
import "../../../constants/colors.css";
import "./button.css";

export default class RestartButton extends Component {

    constructor() {
        super();
        this.state = {
            currentUser: undefined
        }
        this.restart = this.restart.bind(this);
    }

    componentDidMount() {
        let currentUser = AuthService.getCurrentUser();
        if (currentUser) this.setState({ currentUser });
    }

    render() {
        return (
            <div className="form-button bg-lightpink restart" style={{ backgroundImage: 'url(/images/misc/restart.png)' }} >
            </div>
        )
    }

    restart() {
        let currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            FormService.restartForm(this.props.formId)
                .then(() => {
                    window.location.reload();
                })
                .catch(response => {
                    let messages = [];
                    if (response.status && response.error) messages.push(response.status + " " + response.error);
                    if (response.message) messages.push(response.message);
                });
        } else {
            window.location.reload();
        }
    }
}
