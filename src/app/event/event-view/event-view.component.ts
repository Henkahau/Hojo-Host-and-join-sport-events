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
export class EventViewComponent implements OnInit 
{
  eventID: string;
  eventTitle: string;

  event: Event;
  host: User;
  currentUser: User;

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
      .subscribe(event => { this.event = event, this.eventTitle = event.title });

    // HOST
    this.userService.getById(this.event.host.accountId).subscribe(user => {
    this.host = user;
    // Add host as player to list
    this.event.players.push(this.host);
    });
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.eventID);
  }

  joinEvent() {
    // This will be also used to leave event
    this.eventService.joinEvent(this.eventID, this.currentUser.accountId);
  }

  close() {
    this.bsModalRef.hide();
  }

  hasJoined() {
    if (this.event.players.includes(this.currentUser)) {
      return true;
    }
    else {
      return false;
    }
  }

  isHost() {
    if (this.currentUser == this.host) {
      return true;
    }
    else { 
      return false;
    }
  }
}
