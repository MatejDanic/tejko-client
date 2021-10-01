import { React, Component } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

export default class SideBar extends Component {

    render() {
        return (
            <div className="side-bar">
                <Link to="/admin" className="side-bar-element">Dashboard</Link>
                <Link to="/admin/games" className="side-bar-element">Games</Link>
                <Link to="/admin/users" className="side-bar-element">Users</Link>
                <Link to="/admin/roles" className="side-bar-element">Roles</Link>
                <Link to="/admin/scores" className="side-bar-element">Scores</Link>
                <Link to="/admin/yambs" className="side-bar-element">Yambs</Link>
                <Link to="/admin/challenges" className="side-bar-element">Challenges</Link>
                <Link to="/admin/errors" className="side-bar-element">Errors</Link>
            </div>
        );
    }

}