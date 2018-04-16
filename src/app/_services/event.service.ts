import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { Event, User } from '../_models/index';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  static url ='/api';

  createEvent(event: Event){
    return this.http.post('/api/events', event, {responseType: 'text'});
  }

  updateEvent(event: Event){
    return this.http.put('/api/events/' + event[0].eventId, event[0], {responseType: 'text'});
  }

  deleteEvent(eventId: string){
    return this.http.delete('/api/events/' + eventId, {responseType: 'text'});
  }

  getEventById(eventId: string){
    return this.http.get<Event>('/api/events?id=' + eventId);
  }

  getEventByTitle(title: string){
    return this.http.get<Event>('/api/events?title=' + title);
  }

  getEventByPlayType(playType: string){
    return this.http.get<Event>('/api/events?playtype=' + playType);
  }

  getEventBySkillLevel(skillLevel: string){
    return this.http.get<Event>('/api/events?skilllevel=' + skillLevel);
  }

  getEventBySportType(sportType: string){
    return this.http.get<Event>('/api/events?sporttype=' + sportType);
  }

  getEventByLongitude(longitude: string){
    return this.http.get<Event>('/api/events?lng=' + longitude);
  }

  getEventByLatitude(latitude: string){
    return this.http.get<Event>('/api/events?lat=' + latitude);
  }

  getAllEvents(){
    return this.http.get<Event[]>('api/events');
  }

  joinEvent(eventId: string, accountId: string){
    return this.http.post('/api/event/' + eventId + '/join/', accountId, {responseType: 'text'});
  }

  leaveEvent(eventId: string, accountId: string){
    return this.http.post('/api/event/' + eventId + '/leave/', accountId, {responseType: 'text'});
  }

  //used for refresh eventList
  public static refreshEventList: Subject<boolean> = new Subject;

  //parsing date for eventViews
  public parseDate(date: string){
    var dateTime = new Date(date);
    return dateTime.toLocaleDateString();
  }

}
