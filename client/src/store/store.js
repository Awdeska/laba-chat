import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
    user;
    isAuthorized;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    setIsAuthorized(isAuthorized) {
        this.isAuthorized = isAuthorized;
    }

    async login(nickname, password) {
        try {
            const response = await AuthService.login(nickname, password);
            localStorage.setItem('token', response.accessToken);
            this.setUser(response.user);
            return true;
        } catch (e) {
            console.log(e.response?.message);
        }
    }

    async registration(nickname, password) {
        try {
            const response = await AuthService.registration(nickname, password);
            localStorage.setItem('token', response.accessToken);
            this.setUser(response.user);
        } catch (e) {
            console.log(e.response?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.accessToken);
            this.setUser(response.user);
            if (this.user !== undefined) {
                this.setIsAuthorized(true);
            }
        } catch (e) {
            console.log(e);
        }
    }
}
