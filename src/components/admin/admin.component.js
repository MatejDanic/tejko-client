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
				<div className="container-sidebar">
					<SideBar />
				</div>
				<div className="container-content">
					<Switch>
						<Route exact path="/admin" component={AdminDashboard} />
						<Route exact path="/admin/games" component={AdminDatable} />
						<Route exact path="/admin/games/:id" component={AdminData} />
						<Route exact path="/admin/scores" component={AdminDatable} />
						<Route exact path="/admin/scores/:id" component={AdminData} />
						<Route exact path="/admin/users" component={AdminDatable} />
						<Route exact path="/admin/users/:id" component={AdminData} />
						<Route exact path="/admin/roles" component={AdminDatable} />
						<Route exact path="/admin/roles/:id" component={AdminData} />
						<Route exact path="/admin/yambs" component={AdminDatable} />
						<Route exact path="/admin/yambs/:id" component={AdminData} />
						<Route exact path="/admin/challenges" component={AdminDatable} />
						<Route exact path="/admin/challenges/:id" component={AdminData} />
						<Route exact path="/admin/errors" component={AdminDatable} />
						<Route exact path="/admin/errors/:id" component={AdminData} />
					</Switch>
				</div>

			</div>

		);
	}
}

export default withRouter(Admin);