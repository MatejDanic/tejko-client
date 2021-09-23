

import React, { Component } from "react";
import UserService from "../../services/user.service";

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
                console.error("Error:", response);
            });
    }

    render() {
        let users = this.state.users;
        return (
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Ime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user =>
                                <tr key={user.id} id={user.id} onClick={() => { this.props.history.push("/users/" + user.id) }}>
                                    <td>{user.username}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}