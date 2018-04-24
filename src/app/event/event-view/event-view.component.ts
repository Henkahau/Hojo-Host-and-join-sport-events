import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EventService, UserService, AuthenticationService } from '../../_services/index';
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
  geocoder: any;
  address: string;
  joining: boolean;
  playerAmount: number;
  defaultProfile : string = '../../../assets/Images/default_profile_image.png';

  constructor(
    private router: Router,
    protected eventService: EventService,
    private userService: UserService,
    private bsModalRef: BsModalRef,
    private authenticationService: AuthenticationService) {
      
      if(this.getUserLoginStatus()){
        var currentU = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser = currentU.Account;
        this.id.accountId = this.currentUser.accountId;
      } 
  }

  ngOnInit() {
    this.loadEvent();
  }

  ngDoCheck() {
    if(sessionStorage.getItem('addressStatus') == 'Y') {
      this.address = localStorage.getItem('address');
      sessionStorage.setItem('addressStatus', 'N');
    }
  }


  getUserLoginStatus(): boolean {
    return this.authenticationService.getLoginStatus();
  }
 
  private loadEvent() {
    this.eventID = sessionStorage.getItem("eventId");
    this.eventService.getEventById(this.eventID).subscribe(event => {
      this.event = event; 
      this.host = event[0].host;
      this.joining = false;

      if(event[0].players === undefined || event[0].players.length == 0) {
        this.playerAmount = 1; 
      }
      else {
        this.playerAmount = event[0].players.length + 1;
      }
    });
  }

  deleteEvent(id:string) {
    this.eventService.deleteEvent(id).subscribe(() => { EventService.refreshEventList.next(true)});
    sessionStorage.removeItem('eventId');
    this.close();
  }

  joinEvent() {
    this.joining = true;
    this.eventService.joinEvent(this.eventID, this.id).subscribe();
    this.loadEvent();
  }

  leaveEvent() {
    this.eventService.leaveEvent(this.eventID, this.id).subscribe();
    this.loadEvent();
  }

  close() {
    EventService.refreshEventList.next(true);
    this.bsModalRef.hide();
  }

  isHost() {
    if (this.currentUser.accountId == this.host.accountId) {
      return true;
    }
    else {
      return false;
    }
  }

  hasJoined() {
    var isJoined = false;
    for(var i = 0; i < this.event[0].players.length; i++) {
      if(this.event[0].players[i].accountId === this.currentUser.accountId) {
        isJoined = true;
      }
    }
    return isJoined;
  }

  editEvent() {
    this.close();
    this.router.navigate(['/edit-event']);
  }

  reverseGeocode(lat: number, lng: number, map){
    this.geocoder = new google.maps.Geocoder;
    var latlng = {lat: +lat, lng: +lng };
    sessionStorage.setItem('addressStatus', 'N');
   
    this.geocoder.geocode({'location': latlng}, function(results, status) {
      if (status.toString() === 'OK') {
        if (results[0]) {
          // Address can't get out of scope without geocode function
          this.address = results[0].formatted_address.toString();
          localStorage.setItem('address', this.address);
          sessionStorage.setItem('addressStatus', 'Y');
        } else {
          window.alert('No results found');
        } 
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  eventFull() {
    // If player amount is greater or equals to maxAttendees, disable join button (return true)
    return this.event[0].players.length + 1 >= this.event[0].maxAttendees;
  }
}
