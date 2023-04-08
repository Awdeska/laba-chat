import $api, {API_URL} from "../http";
import axios from "axios";

export default class AuthService {
    static async login(nickname, password){
        return $api.post('/login', {nickname, password}).then((response) => {
            const items = response.data;
            return items;
        })
            .catch((err) => console.log(err));;
    }

    static async registration(nickname, password) {
        return $api.post('/registration', {nickname, password}).then((response) => {
            const items = response.data;
            return items;
        })
            .catch((err) => console.log(err));;
    }

    static async refresh() {
        return axios.get(`${API_URL}/refresh`, {withCredentials: true}).then(response => {
            const items = response.data;
            return items;
        }).catch((err) => console.log(err));
    }
}

