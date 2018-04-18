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
  geocoder = new google.maps.Geocoder;
  address: string;

  constructor(
    private router: Router,
    protected eventService: EventService,
    private userService: UserService,
    private bsModalRef: BsModalRef) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadEvent();    
  }
 

  private loadEvent() {
    this.eventID = sessionStorage.getItem("eventId");
    console.log(this.eventID);
    this.eventService.getEventById(this.eventID).subscribe(event => {
      this.event = event;
      console.log(this.event[0]);
      
      // HOST
      this.host = event[0].host;
      // Add host as a player to list
      if (this.event.players === undefined) {
        this.eventService.joinEvent(this.eventID, this.host.accountId);
      } 
    });
  }

  deleteEvent(id:string) {
    this.eventService.deleteEvent(id).subscribe(() => { EventService.refreshEventList.next(true)});
    this.close();
  }

  joinEvent() {
    var isJoined = false;
    for(var i = 0; i < this.event[0].players.length; i++) {
      if(this.event[0].players[i].accountId === this.currentUser.accountId) {
        isJoined = true;
      }
    }

    if(!isJoined) {
      this.eventService.joinEvent(this.eventID, this.currentUser.accountId);
      console.log("Joined");
    }
    else {
      console.log("Already in");
    }
  }

  leaveEvents() {
    this.eventService.leaveEvent(this.eventID, this.currentUser.accountId);
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

  reverseGeocode(lat: number, lng: number, map){
    var latlng = {lat: +lat, lng: +lng };
   
    this.geocoder.geocode({'location': latlng}, function(results, status) {
      if (status.toString() === 'OK') {
        if (results[0]) {
          // Address can't get out of scope without geocode function
          this.address = results[0].formatted_address.toString();
          localStorage.setItem('address', this.address);
        } else {
          window.alert('No results found');
        } 
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    this.address = localStorage.getItem('address');
  }
}
