import React, { Component } from 'react';
import './navigation-bar.css';

export default class NavigationBar extends Component {
    
    render() {
        return (
            <div className="navigation-bar">
                <a href="/">Home</a>
                <a href="/games">Games</a>
                <a href="/users">Users</a>
                <a href="/scores">Scores</a>
            </div>
        );
    }
}