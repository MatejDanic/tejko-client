

import React, { Component } from "react";
import UserService from "../../services/user.service";
import "./board.css";

export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        UserService.getUsers()
            .then(response => {
                let users = [];
                for (let key in response) {
                    users.push(response[key]);
                }
                this.setState({ users });
            })
            .catch(response => {
                let messages = [];
                if (response.status && response.error) messages.push(response.status + " " + response.error);
                if (response.message) messages.push(response.message);
            });
    }

    render() {
        let users = this.state.users;
        return (
            <table className="board-list">
                <thead>
                    <tr>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id} id={user.id}>
                            <td>{user.username}</td>
                        </tr>)}
                </tbody>
            </table>
        );
    }
}