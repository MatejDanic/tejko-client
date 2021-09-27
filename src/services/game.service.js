import { request } from "./xhr.service";
import API_URL from "../constants/api-url";

const url = API_URL + "/games";

class GameService {

    getGames() {
        return request("GET", url, null);
    }

    getGame(gameId) {
        return request("GET", url + "/" + gameId, null);
    }

    deleteGame(gameId) {
        return request("DELETE", url + "/" + gameId, null);
    }
}

export default new GameService();
