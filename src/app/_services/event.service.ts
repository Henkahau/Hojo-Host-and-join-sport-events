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

  getSpecificEvents(event: any){
    if(event.sportType == null || event.sportType == 'Any' )
      event.sportType = '';   
    if(event.skillLevel == null || event.skillLevel == 'Any' )
      event.skillLevel = '';   
    if(event.playType == null || event.skillLevel == 'Any' )
      event.playType = '';  
    if(event.maxAttendees == null || event.skillLevel == 'Any')
      event.maxAttendees = '';
      
    return this.http.get<Event[]>('api/events?sporttype=' + event.sportType +
                                  '&skilllevel=' + event.skillLevel +
                                  '&playtype=' + event.playType +
                                  '&maxattendees=' + event.maxAttendees  );

  }

  joinEvent(eventId: string, accountId: string){
    return this.http.post('/api/event/' + eventId + '/join/', accountId, {responseType: 'text'});
  }

  leaveEvent(eventId: string, accountId: string){
    return this.http.post('/api/event/' + eventId + '/leave/', accountId, {responseType: 'text'});
  }

  //used for refresh eventList
  public static refreshEventList: Subject<boolean> = new Subject;

}
