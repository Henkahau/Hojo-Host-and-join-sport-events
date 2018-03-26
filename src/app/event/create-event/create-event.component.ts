import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event, SportType, SkillLevel, PlayType, User } from '../../_models/index';
import { EventService, AlertService } from '../../_services/index';
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
<<<<<<< HEAD
  playTypeValues: PlayType[] = [PlayType.CASUAL, PlayType.COMPETETIVE];
  currentUser: User;
=======
  playTypeValues = Object.values(PlayType);

  latitude:  number;
  longitude: number;
>>>>>>> 0d2b17f5e173dd8b7590878b661ef9c2c37a161a
  
  constructor(
      private router: Router,
      private eventService: EventService,
      private alertService: AlertService) 
      {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }

  ngOnInit() {
  }
 
  createEvent(){
    this.loading = true;
    this.eventService.createEvent(this.model)
        .subscribe(
          data => {
            //set succes message and pass true parameter to persist teh message after redirectin to the main page
            this.alertService.success('Event created succesfull', false);
            //navigate to main page..
            this.router.navigate(['/home']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
  }
}
