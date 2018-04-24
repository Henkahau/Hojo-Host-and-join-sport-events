import { Component, OnInit, Output } from '@angular/core';
import { User, Event } from '../_models/index'
import { UserService, AlertService, AuthenticationService, EventService } from '../_services';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { EventViewComponent } from '../event/event-view';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  moduleId: module.id
})

export class UserProfileComponent implements OnInit {
  
  model: any = {};
  currentUser: User;
  id: string;
  hostedEvents: Event[];
  joinedEvents: Event[];
  userProfileId: string;
  imagePath: string = '../../assets/Images/default_profile_image.png';

  modalRef: BsModalRef;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              protected eventService: EventService,
              private modalService: BsModalService,
              private router: Router) {
                 var currUser = JSON.parse(localStorage.getItem('currentUser'));
                 this.id = currUser.Account.accountId;
                
                 EventService.refreshEventList.subscribe(res =>{
                   this.loadProfile();
                 })
                }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(){
    this.userService.getById(this.id).subscribe(user => {
      this.currentUser = user[0];

      this.joinedEvents = this.currentUser.events;
      this.hostedEvents = this.currentUser.hostedEvents;

    });
  }

  private isHosting(): boolean{
    if(this.hostedEvents != undefined){
        return this.hostedEvents.length > 0;
    }else{
        return false;
      }
  }

  private hasJoined(): boolean{
    if(this.joinedEvents != undefined){
      return this.joinedEvents.length > 0;
    }else{
      return false;
    }
  }

  private openEventView(id: string) {
    //OPENING EVENTVIEW HAS SOME ERROR
    sessionStorage.setItem("eventId", id);
    this.modalRef = this.modalService.show(EventViewComponent, { class: 'modal-lg' });
  }

  navigate(destination: string) {
    switch(destination) {
      case 'edit':
      this.router.navigate(['/edit-profile']);
      break;

      case 'home':
      this.router.navigate(['']);
      break;
    }
  }
}
