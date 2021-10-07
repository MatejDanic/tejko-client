import { React, Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import SideBar from "../navigation/side-bar.component";
import AdminDashboard from "./admin-dashboard.component";
import AdminDatable from "./admin-datatable.component";
import AdminData from "./admin-data.component";

import "./admin.css";

class Admin extends Component {

	render() {
		return (
			<div className="container">
				<SideBar />
				<div className="container-content">
					<Switch>
						<Route exact path="/admin" component={AdminDashboard} />
						<Route exact path="/admin/games" component={() => <AdminDatable object={"games"} />} />
						<Route exact path="/admin/games/:id" component={() => <AdminData object={"games"} />} />
						<Route exact path="/admin/scores" component={() => <AdminDatable object={"scores"} />} />
						<Route exact path="/admin/scores/:id" component={() => <AdminData object={"scores"} />} />
						<Route exact path="/admin/users" component={() => <AdminDatable object={"users"} />} />
						<Route exact path="/admin/users/:id" component={() => <AdminData object={"users"} />} />
						<Route exact path="/admin/roles" component={() => <AdminDatable object={"roles"} />} />
						<Route exact path="/admin/roles/:id" component={() => <AdminData object={"roles"} />} />
						<Route exact path="/admin/yambs" component={() => <AdminDatable object={"yambs"} />} />
						<Route exact path="/admin/yambs/:id" component={() => <AdminData object={"yambs"} />} />
						<Route exact path="/admin/challenges" component={() => <AdminDatable object={"challenges"} />} />
						<Route exact path="/admin/challenges/:id" component={() => <AdminData object={"challenges"} />} />
						<Route exact path="/admin/errors" component={() => <AdminDatable object={"errors"} />} />
						<Route exact path="/admin/errors/:id" component={() => <AdminData object={"errors"} />} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default withRouter(Admin);