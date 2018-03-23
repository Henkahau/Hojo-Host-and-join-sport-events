import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventService, AlertService } from '../../_services/index';
import { Event, SportType, SkillLevel, PlayType } from '../../_models/index';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
  moduleId: module.id
})
export class EditEventComponent implements OnInit {

  loading = false;
  model: any = {};
  event: Event;
  eventTitle: string;
  static editEventId: string;

  sportValues = Object.values(SportType);
  skillValues = Object.values(SkillLevel);
  playTypeValues = Object.values(PlayType);

  constructor(
            private eventService: EventService,  
            private alertService: AlertService,
            private router: Router) { }

  ngOnInit() {
    this.loadEvent();
    
  }

  private loadEvent(){
    this.eventService.getEventById(EditEventComponent.editEventId).subscribe(event => {
       this.event = event, 
       this.eventTitle = event.title 
      });
  }

 
  private editEvent(){
    this.eventService.updateEvent(this.event)
    .subscribe(
      data => {
        //set succes message and pass true parameter to persist the message after redirectin to the main page
        this.alertService.success('Event edited succesfull');
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
