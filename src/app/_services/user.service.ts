import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    static url ='/api';
 
    getAll() {
        return this.http.get<User[]>(UserService.url + '/users').map(res => res);
    }
 
    getById(id: string) {
        return this.http.get(UserService.url + '/account?uuid=' + id).map(res => res);
    }
 
    create(user: User) {
        return this.http.post(UserService.url + '/account/person', user);
    }
 
    update(user: User) {
        return this.http.put(UserService.url + '/users/' + user.id, user).map(res => res);
    }
 
    delete(id: string) {
        return this.http.delete(UserService.url + '/users/' + id).map(res => res);
    }
}