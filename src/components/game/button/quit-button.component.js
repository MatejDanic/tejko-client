import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import FormService from "../../../services/form.service";
import "../../../constants/colors.css";
import "./button.css";

export default class QuitButton extends Component {

    constructor() {
        super();
        this.state = {
            currentUser: undefined,
        }
        this.quit = this.quit.bind(this);
    }

    componentDidMount() {
        let currentUser = AuthService.getCurrentUser();
        if (currentUser) this.setState({ currentUser });
    }

    render() {
        return (
            <div className="form-button bg-lightpink restart" style={{ backgroundImage: 'url(/images/misc/logout.png)' }} >

            </div>
        )
    }

    quit() {
        let currentUser = this.state.currentUser;
        if (currentUser) {
            this.props.onQuit();
        } else {
            window.location.reload();
        }
    }
}
