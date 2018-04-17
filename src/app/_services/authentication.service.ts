import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {

    isUserLoggedIn: boolean;

    constructor(
        private http: HttpClient,
        private router: Router) { }
 
    login(email: string, notapwhash: string) { 
        return this.http.post<any>('/api/authenticate/login', {email: email, notapwhash: notapwhash})        
        .map(res => {
                console.log(res);
                var token = res.Token;
                var user = res.Account;

                console.log("token: ", res.Token);
                console.log("user: ", res.Account);
                // login successful if there's a jwt token in the response
                
                if (user && token) {
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
        this.router.navigate(['/']);
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