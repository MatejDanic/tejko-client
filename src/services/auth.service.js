import { request } from "./xhr.service";
import API_URL from "../constants/api-url";

const url = API_URL + "/auth";

class AuthService {

	login(credentials) {
		return request("POST", url + "/login", credentials);
	}

	register(credentials) {
		return request("POST", url + "/register", credentials);
	}

	getCurrentUser() {
		let user = localStorage.getItem("user");
		if (user && user !== "undefined") {
			return JSON.parse(user);
		} else {
			localStorage.removeItem("user");
			return null;
		}
	}
}

export default new AuthService();

export function authHeader() {
	let user = localStorage.getItem("user");
	if (user && user !== "undefined") {
		return { Authorization: "Bearer " + JSON.parse(user).accessToken };
	} else {
		localStorage.removeItem("user");
		return;
	}
}

export function getToken() {
	let user = localStorage.getItem("user");
	if (user && user !== "undefined") {
		return JSON.parse(user).accessToken;
	} else {
		localStorage.removeItem("user");
		return null;
	}
}