import { request } from "./xhr.service";
import API_URL from "../constants/api-url";

class AdminService {

	getItems(path) {
		const url = API_URL + "/" + path;
		return request("GET", url, null);
	}

	getItem(path) {
		const url = API_URL + "/" + path;
		return request("GET", url, null);
	}

}

export default new AdminService();
