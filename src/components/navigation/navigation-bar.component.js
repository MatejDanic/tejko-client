import React, { Component } from 'react';
import './navigation-bar.css';

export default class NavigationBar extends Component {
    
    render() {
        return (
            <div className="navigation-bar">
                <a href="/">Home</a>
                <a href="/admin">Admin</a>
            </div>
        );
    }
}