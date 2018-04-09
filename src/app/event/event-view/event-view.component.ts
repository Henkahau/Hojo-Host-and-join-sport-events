import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { EventService, UserService } from '../../_services/index';
import { Router } from '@angular/router';
import { Event, SportType, PlayType, SkillLevel, User } from '../../_models';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  eventID: string;
  eventTitle: string;

  event: Event;
  host: User;
  currentUser: User;

  date: Date;

  constructor(
    private router: Router,
    private eventService: EventService,
    private userService: UserService,
    private bsModalRef: BsModalRef) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadEvent();
       
  }

  private loadEvent() {
    this.eventID = sessionStorage.getItem("eventId");
    this.eventService.getEventById(this.eventID)
      .subscribe(event => { this.event = event, this.eventTitle = event.title, this.date = new Date(event.date)});
    // THIS ONE WILL BE HOST
  /*   this.userService.getById('58ac4635-b5ed-44c2-b134-96d2161496c7').subscribe(user => {
    this.REPLACABLE_USER = user;
    // Add host as player to list
    this.event.players.push(this.REPLACABLE_USER);
    }); */
  
  }

  deleteEvent(id:string) {
    this.eventService.deleteEvent(id).subscribe(() => { EventService.refreshEventList.next(true)});
    this.close();
  }

  joinEvent() {
    this.eventService.joinEvent(this.eventID, this.currentUser.accountId);
  }

  leaveEvent() {
    this.eventService.leaveEvent(this.eventID, this.currentUser.accountId);
  }

  close() {
    this.bsModalRef.hide();
  }

  private getDate(date: string){
    this.date = new Date(date);
    return this.date.toLocaleDateString();
  }

  editEvent(){
    this.close();
    this.router.navigate(['/edit-event']);
  }

}
