import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    static url ='/api';
 
    getAll() {
        return this.http.get<User[]>(UserService.url + '/users');
    }
 
    getById(id: string) {
        return this.http.get<User>(UserService.url + '/account?uuid=' + id).map(res => res);
    }
 
    create(user: User) {
        console.log('SERVICE: ' + JSON.stringify(user));
        return this.http.post(UserService.url + '/accounts/person', user, {responseType: 'json'});
    }
 
    update(user: User) {
        return this.http.patch( UserService.url + '/accounts?id=' + user.accountId, user, {responseType: 'text'});
    }
 
    delete(id: string) {
        return this.http.delete(UserService.url + '/users/' + id);
    }
}

