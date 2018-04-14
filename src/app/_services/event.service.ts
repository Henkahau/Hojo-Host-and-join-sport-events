import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { Event, User } from '../_models/index';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  static url ='/api';
  urlLat = '';
  urlLng = '';
  urlRadius = '';
  public eventInfo = new Subject<{}>();

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

  getSpecificEvents(event: any){
    if(event.sportType == null || event.sportType == 'Any' )
      event.sportType = '';   
    if(event.skillLevel == null || event.skillLevel == 'Any' )
      event.skillLevel = '';   
    if(event.playType == null || event.playType == 'Any' )
      event.playType = '';  
    if(event.maxAttendees == null || event.maxAttendees == 'Any')
      event.maxAttendees = '';
    if(event.lat)
       this.urlLat = '&lat=' + event.lat;
    if(event.lng)
       this.urlLng = '&lng=' + event.lng;
    if(event.radius)
      this.urlRadius = '&radius=' + event.radius;
      
    return this.http.get<Event[]>('api/events?sporttype=' + event.sportType +
                                  '&skilllevel=' + event.skillLevel +
                                  '&playtype=' + event.playType +
                                  '&maxattendees=' + event.maxAttendees +
                                  this.urlLat + this.urlLng + this.urlRadius);
  }

  joinEvent(eventId: string, accountId: string){
    return this.http.post('/api/event/' + eventId + '/join/', accountId, {responseType: 'text'});
  }

  leaveEvent(eventId: string, accountId: string){
    return this.http.post('/api/event/' + eventId + '/leave/', accountId, {responseType: 'text'});
  }

  // Emit eventInfo (filters) from map.component to eventlist.component
  emitEventInfo(eventFilters) {
    this.eventInfo.next(eventFilters);
  }

  //used for refresh eventList
  public static refreshEventList: Subject<boolean> = new Subject;

  //parsing date for eventViews
  public parseDate(date: string){
    var dateTime = new Date(date);
    return dateTime.toLocaleDateString();
  }

}
