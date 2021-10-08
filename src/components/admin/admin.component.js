import { React, Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import SideBar from "../navigation/side-bar.component";
import AdminDashboard from "./admin-dashboard.component";
import AdminDatable from "./admin-datatable.component";
import AdminData from "./data/admin-data.component";

import "./admin.css";

class Admin extends Component {

	render() {
		return (
			<div className="container">
				<SideBar />
				<div className="container-content">
					<Switch>
						<Route exact path="/admin" component={AdminDashboard} />
						<Route exact path="/admin/games" render={() => <AdminDatable resource={"games"} />} />
						<Route exact path="/admin/games/:id" render={() => <AdminData resource={"games"} />} />
						<Route exact path="/admin/scores" render={() => <AdminDatable resource={"scores"} />} />
						<Route exact path="/admin/scores/:id" render={() => <AdminData resource={"scores"} />} />
						<Route exact path="/admin/users" render={() => <AdminDatable resource={"users"} />} />
						<Route exact path="/admin/users/:id" render={() => <AdminData resource={"users"} />} />
						<Route exact path="/admin/roles" render={() => <AdminDatable resource={"roles"} />} />
						<Route exact path="/admin/roles/:id" render={() => <AdminData resource={"roles"} />} />
						<Route exact path="/admin/yambs" render={() => <AdminDatable resource={"yambs"} />} />
						<Route exact path="/admin/yambs/:id" render={() => <AdminData resource={"yambs"} />} />
						<Route exact path="/admin/challenges" render={() => <AdminDatable resource={"challenges"} />} />
						<Route exact path="/admin/challenges/:id" render={() => <AdminData resource={"challenges"} />} />
						<Route exact path="/admin/errors" render={() => <AdminDatable resource={"errors"} />} />
						<Route exact path="/admin/errors/:id" render={() => <AdminData resource={"errors"} />} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default withRouter(Admin);