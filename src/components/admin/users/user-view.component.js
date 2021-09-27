

import React, { Component } from "react";
import UserService from "../../../services/user.service";
import "../admin.css";

export default class UserView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        UserService.getUser(this.props.match.params.userId)
            .then(user => {
                this.setState({ user });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        let user = this.state.user;
        return (
            <div className="container-padding">
                <h2>User</h2>
                <div>
                    <b>ID: </b>{user.id}
                </div>
                <div>
                    <b>Username: </b>{user.username}
                </div>
                <div>
                    <b>Roles:</b> {user.roles &&
                        <ul>
                            {user.roles.map(role =>
                                <li key={role.id}>
                                        {role.label}
                                </li>
                            )}
                        </ul>
                    }
                </div>
            </div>
        );
    }

}