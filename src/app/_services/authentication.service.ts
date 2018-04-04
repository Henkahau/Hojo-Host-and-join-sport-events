import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {

    isUserLoggedIn: boolean;

    constructor(private http: HttpClient) { }
 
    login(email: string, notapwhash: string) { 
        return this.http.post<any>('/api/authenticate/login?email=' + email +'&notapwhash=' + notapwhash, {email, notapwhash})
            .map(res => {
                console.log(res);
                var result = Object.assign([], res);

                for( var i = 0; i < result.length; i++){
                    var token = result[0];
                    var user = result[1];
                }
                console.log("token: ", token);
                console.log("user: ", user);
                // login successful if there's a jwt token in the response
                user.token = token;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(localStorage.getItem('currentUser'));
                } 
 
                return user;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        this.setLoginStatus(false);
        localStorage.removeItem('currentUser');
    }

    setLoginStatus(flag){
        this.isUserLoggedIn = flag;
    }

    getLoginStatus(): boolean{
        if(localStorage.getItem('currentUser')){
            this.setLoginStatus(true);
        }
        return this.isUserLoggedIn;
    }
}