import { request } from "./xhr.service";
import API_URL from "../constants/api-url";

class AdminService {

	getItems(resource) {
		let url = API_URL + "/" + resource;
		return request("GET", url, null);
	}

	getItem(resource) {
		let url = API_URL + "/" + resource;
		return request("GET", url, null);
	}

	updateItems(resource, body) {
		let url = API_URL + "/" + resource;
		return request("PUT", url, body);
	}

	deleteItems(resource, body) {
		let url = API_URL + "/" + resource;
		return request("DELETE", url, body);
	}

}

export default new AdminService();
