import { React, Component } from "react";
import { Link } from "react-router-dom";
import "./admin.css";

export default class AdminSidebar extends Component {

    render() {
        return (
            <div className="admin-sidebar">
                <Link to="/admin" className="admin-sidebar-element">Dashboard</Link>
                <Link to="/admin/games" className="admin-sidebar-element">Games</Link>
                <Link to="/admin/users" className="admin-sidebar-element">Users</Link>
                <Link to="/admin/scores" className="admin-sidebar-element">Scores</Link>
            </div>
        );
    }

}