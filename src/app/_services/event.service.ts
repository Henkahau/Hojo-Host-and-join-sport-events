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

  updateEvent(id: string, event: Event){
    return this.http.patch('/api/events?id=' + id, event, {responseType: 'text'});
  }

  deleteEvent(eventId: string){
    return this.http.delete('/api/events/' + eventId, {responseType: 'text'});
  }

  getEventById(eventId: string){
    return this.http.get<Event>('/api/events?id=' + eventId);
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
    return this.http.post('/api/events/' + eventId + '/join/', accountId, {responseType: 'text'});
  }

  leaveEvent(eventId: string, accountId: any){
    return this.http.delete('/api/events/' + eventId + '/leave/', accountId);
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
    dateTime.setSeconds(0); 
    return dateTime.toLocaleString().replace(".00", "").replace(":00 AM"," AM").replace(":00 PM"," PM");
  }
}
