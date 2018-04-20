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
        return this.http.get<User>(UserService.url + '/accounts?id=' + id);
    }
 
    create(user: User) {
        console.log('SERVICE: ' + JSON.stringify(user));
        return this.http.post(UserService.url + '/accounts/person', user, {responseType: 'text'});
    }
 
    update(id: string, user: User) {
        return this.http.patch( UserService.url + '/accounts?id=' + id, user, {responseType: 'text'});
    }
 
    delete(id: string) {
        return this.http.delete(UserService.url + '/accounts?id=' + id, {responseType: 'text'});
    }
}

