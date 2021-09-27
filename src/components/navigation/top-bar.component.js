import { React, Component } from "react";
import { Link } from "react-router-dom";
import "./top-bar.css";

export default class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <Link to="/" className="top-bar-element">Home</Link>
                    <Link to="/games" className="top-bar-element">Games</Link>
                    <Link to="/users" className="top-bar-element">Users</Link>
                    <Link to="/scores" className="top-bar-element">Scores</Link>
                </div>
                <div className="top-bar-right">
                    <Link to="/admin" className="top-bar-element">Admin</Link>
                    <Link to="/register" className="top-bar-element">Register</Link>
                    <Link to="/login" className="top-bar-element">Login</Link>
                </div>
            </div>
        );
    }
}