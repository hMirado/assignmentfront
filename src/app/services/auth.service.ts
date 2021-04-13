import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    admin = false;

    authToken = false;
    user;

    uri = "http://localhost:8010/api/authentication";
   // uri = "https://backmadagascar2021.herokuapp.com/api/authentication"

    constructor(private http: HttpClient) {
    }

    signIn(user):Observable<any> {
        return this.http.post(this.uri + '/login', user)
    }

    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;

        if (this.user.role === 'admin') {
            this.admin = true;
        }
    }


    loggedIn() {
        var token = localStorage.getItem('token');
        const helper = new JwtHelperService();
        return !helper.isTokenExpired(token);
    }

    // exemple d'utilisation :
    // isAdmin.then(admin => { console.log("administrateur : " + admin);})
    isAdmin() {
        return new Promise((resolve, reject) => {
            resolve(this.admin);
        });
    }

    signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.admin = false;
    }
}
