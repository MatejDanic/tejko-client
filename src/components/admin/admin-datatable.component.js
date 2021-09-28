

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import AdminService from "../../services/admin.service";
import "./admin.css";


export default class AdminDatable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            headers: []
        };
    }

    componentDidMount() {
        AdminService.getItems(this.props.location.pathname.split("/")[2])
            .then(items => {
                let headers = [];
                for (let key in items[0]) {
                    if (!(items[0][key] instanceof Array)) {
                        headers.push(key);
                    }
                }
                this.setState({ items, headers });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        let items = this.state.items;
        let headers = this.state.headers;
        return (
            <table className="table-custom">
                <thead>
                    <tr>
                        {headers.map(header =>
                            <th key={header}>
                                {header}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {items.map(item =>
                        <tr key={item}>
                            {headers.map(header =>
                                <td key={header}>
                                   {item[header]}
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

}