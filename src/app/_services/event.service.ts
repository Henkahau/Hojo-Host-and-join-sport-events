import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Event } from '../_models/index';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  createEvent(event: Event){
    return this.http.post('/api/events', event);
  }

  updateEvent(event: Event){
    return this.http.put('/api/events' + event.eventId, event);
  }

  deleteEvent(id: number){
    return this.http.delete('/api/events' + id);
  }

  getEventById(id: number){
    return this.http.get('/api/events' + id);
  }

  getAllEvents(){
    return this.http.get<Event[]>('/api/events');
  }

}
