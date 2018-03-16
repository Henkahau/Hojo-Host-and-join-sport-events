import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event, SportType, SkillLevel, PlayType } from '../../_models/index';
import { EventService, AlertService } from '../../_services/index';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  moduleId: module.id
})

export class CreateEventComponent implements OnInit {
  model: any = {};
  loading = false;
  sportValues = Object.values(SportType);
  skillValues = Object.values(SkillLevel);
  playTypeValues: PlayType[] = [PlayType.CASUAL, PlayType.COMPETETIVE];
  
  constructor(
      private router: Router,
      private eventService: EventService,
      private alertService: AlertService) {}

  ngOnInit() {
  }
 
  createEvent(){
    this.loading = true;
    this.eventService.createEvent(this.model)
        .subscribe(
          data => {
            //set succes message and pass true parameter to persist teh message after redirectin to the main page
            this.alertService.success('Event created succesfull')
            //navigate to main page..
            this.router.navigate(['/']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
  } 

}
