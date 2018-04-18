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
  event: Event;
  host: User;
  currentUser: User;
  id: any = {};

  constructor(
    private router: Router,
    protected eventService: EventService,
    private userService: UserService,
    private bsModalRef: BsModalRef) {
      var currentU = JSON.parse(localStorage.getItem('currentUser'));
      this.currentUser = currentU.Account;
      this.id.accountId = this.currentUser.accountId;
    
  }

  ngOnInit() {
    this.loadEvent();    
  }

  private loadEvent() {
    this.eventID = sessionStorage.getItem("eventId");
    console.log(this.eventID);
    this.eventService.getEventById(this.eventID).subscribe(event => {
      this.event = event;
      
      // HOST
      this.host = event[0].host;
      // Add host as a player to list
     /*  if (this.event.players === undefined) {
        this.eventService.joinEvent(this.eventID, this.host.accountId);
      } */
    });
  }

  deleteEvent(id:string) {
    this.eventService.deleteEvent(id).subscribe(() => { EventService.refreshEventList.next(true)});
    this.close();
  }

  joinEvent() {
    console.log(this.id);
    this.eventService.joinEvent(this.eventID, this.id).subscribe();
  }

  leaveEvents() {
    this.eventService.leaveEvent(this.eventID, this.id).subscribe();
  }

  close() {
    EventService.refreshEventList.next(true);
    this.bsModalRef.hide();
  }

  isHost() {
    if (this.currentUser == this.host) {
      return true;
    }
    else {
      return false;
    }
  }

  editEvent() {
    this.close();
    this.router.navigate(['/edit-event']);
  }
}
