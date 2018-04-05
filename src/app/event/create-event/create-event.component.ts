import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Event, SportType, SkillLevel, PlayType, User } from '../../_models/index';
import { EventService, AlertService, UserService } from '../../_services/index';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  moduleId: module.id
})

export class CreateEventComponent implements OnInit {
  model: any = {};
  loading = false;
  sportValues = Object.values(SportType);
  skillValues = Object.values(SkillLevel);
  playTypeValues = Object.values(PlayType);

  latitude: number;
  longitude: number;

  event: Event;
  currentUser: User;


  constructor(
    private router: Router,
    private eventService: EventService,
    private alertService: AlertService,
    private userService: UserService,
    private bsModalRef: BsModalRef) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {}

  close() {
    this.bsModalRef.hide();
  }

  createEvent() {
    this.loading = true;
    //this.model.host = this.currentUser;
    this.eventService.createEvent(this.model)
        .subscribe(
          data => {
            EventService.refreshEventList.next(true);
            //set succes message and pass true parameter to persist teh message after redirectin to the main page
            this.alertService.success('Event created succesfull', false);
            //navigate to main page..
            this.bsModalRef.hide();
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
  }
}
