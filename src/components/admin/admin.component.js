import { React, Component } from "react";
import { Route, Switch } from "react-router-dom";
import AdminSidebar from "./admin-sidebar.component";
import AdminDashboard from "./admin-dashboard.component";
import AdminDatable from "./admin-datatable.component";
import UserView from "./users/user-view.component";
import GameList from "./games/game-list.component";
import GameView from "./games/game-view.component";
import "./admin.css";

export default class Admin extends Component {

    render() {
        return (
            <div className="container">
                <div className="container-sidebar">
                    <AdminSidebar />
                </div>
                <div className="container-content">
                    <Switch>
                        <Route exact path="/admin" component={AdminDashboard} />
                        <Route exact path="/admin/users" component={AdminDatable} />
                        <Route exact path="/admin/users/:userId" component={UserView} />
                        <Route exact path="/admin/games" component={AdminDatable} />
                        <Route exact path="/admin/games/:gameId" component={GameView} />
                    </Switch>
                </div>

            </div>

        );
    };

};