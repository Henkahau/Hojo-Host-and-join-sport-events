import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { Event, User } from '../_models/index';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  static url ='/api';

  createEvent(event: Event){
    console.log(event);
    return this.http.post('/api/events', event, {responseType: 'text'});
  }

  updateEvent(event: Event){
    return this.http.put('/api/events/' + event.eventId, event, {responseType: 'text'});
  }

  deleteEvent(eventId: string){
    return this.http.delete('/api/events/' + eventId, {responseType: 'text'});
  }

  getEventById(eventId: string){
    return this.http.get<Event>('/api/events/' + eventId);
  }

  getAllEvents(){
    return this.http.get<Event[]>('api/events');
  }

 
  joinEvent(eventId: string, accountId: string){
    return this.http.put('/api/events' + eventId, accountId, {responseType: 'text'});
  }

  //used for refresh eventList
  public static refreshEventList: Subject<boolean> = new Subject;

}
