

import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../../../services/user.service";
import "../admin.css";


export default class UserList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        UserService.getUsers()
            .then(users => {
                this.setState({ users });
            })
            .catch(error => {
                console.error(error);
            });
    }


    render() {
        let users = this.state.users;
        return (
            <table className="table-custom">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td><Link to={"/admin/users/" + user.id}>{user.id}</Link></td>
                            <td>{user.username}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

}