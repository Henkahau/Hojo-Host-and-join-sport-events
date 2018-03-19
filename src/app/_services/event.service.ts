import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Event, User } from '../_models/index';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }
  // uuid? varmista hollantilaisilta
  // Haluavatko id:t stringeinä

  createEvent(event: Event){
    return this.http.post('/api/events', event);
  }

  updateEvent(event: Event){
    return this.http.put('/api/events' + event.id, event);
  }

  deleteEvent(eventId: number){
    return this.http.delete('/api/events' + eventId);
  }

  getEventById(eventId: number){
    return this.http.get('/api/events' + eventId);
  }

  getAllEvents(){
    return this.http.get<Event[]>('/api/events');
  }

  // Miksi accountId on string Hollantilaisten interfacessa?
  joinEvent(eventId: number, accountId: number){
    return this.http.put('/api/events' + eventId, accountId);
  }
}
