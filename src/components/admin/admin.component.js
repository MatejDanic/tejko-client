import { React, Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import AdminSideBar from "./admin-side-bar.component"
import AdminDashboard from "./admin-dashboard.component"
import AdminDatable from "./admin-datatable.component"
import AdminData from "./data/admin-data.component"

import "./admin.css"

class Admin extends Component {
	render() {
		return (
			<div className="container-page">
				<AdminSideBar />
				<Switch>
					<Route exact path="/admin" component={AdminDashboard} />
					<Route exact path="/admin/apps" render={() => <AdminDatable resource={"apps"} />} />
					<Route exact path="/admin/apps/:id" render={() => <AdminData resource={"apps"} />} />
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
					<Route exact path="/admin/logs" render={() => <AdminDatable resource={"logs"} />} />
					<Route exact path="/admin/logs/:id" render={() => <AdminData resource={"logs"} />} />
				</Switch>
			</div>
		)
	}
}

export default withRouter(Admin);