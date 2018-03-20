import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    static url ='/api';
 
    getAll() {
        return this.http.get<User[]>('/api/users');
    }
 
    getById(id: string) {
        return this.http.get(UserService.url + '/account?uuid=' + id).map(res => res);
    }
 
    create(user: User) {
        return this.http.post('/api/users', user);
    }
 
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }
 
    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}