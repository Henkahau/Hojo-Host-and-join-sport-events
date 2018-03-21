import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    static url ='/api';
 
    getAll() {
        return this.http.get<User[]>('/api/person');
    }
 
    getById(id: string) {
        return this.http.get('api/account?uuid=' + id).map(res => res);
    }
 
    create(user: User) {
        return this.http.post('api/account/person', user);
    }
 
    update(user: User) {
        return this.http.put('/api/person/' + user.id, user);
    }
 
    delete(id: number) {
        return this.http.delete('/api/person/' + id);
    }
}