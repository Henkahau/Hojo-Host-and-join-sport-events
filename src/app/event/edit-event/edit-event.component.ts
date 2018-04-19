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
  private eventToEdit: any = {};
  eventTitle: string;
  dateT: Date;
  dateO: Date;
  now = new Date();

  sportValues = Object.values(SportType);
  skillValues = Object.values(SkillLevel);
  playTypeValues = Object.values(PlayType);

  constructor(
            protected eventService: EventService,  
            private alertService: AlertService,
            private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("eventId") != null){
      this.loadEvent();
    }else{
      this.router.navigate(['/']);
    }
    
  }


  private loadEvent(){
    this.eventService.getEventById(sessionStorage.getItem("eventId")).subscribe(event => {
       this.event = event[0];
       this.eventTitle = event[0].title
       this.dateT = new Date(event[0].date);
        this.setCompareEvent(event[0].eventId);
      });
  }

  private setCompareEvent(id: string){
    this.eventService.getEventById(id).subscribe(event => {
       this.eventToEdit = event[0];
       this.dateO = new Date(event[0].date);
      });
  }


  private cancel(){
    sessionStorage.removeItem("eventId");
    this.router.navigate(['/']);
  }

  private getChanges(newe: Event,old: Event){

    if(this.dateT.toISOString() != this.dateO.toISOString()){
      this.model.date = this.dateT.toISOString();
    }
    
    if(newe.title != old.title){
      this.model.title = newe.title;
    }
    if(newe.sportType != old.sportType){
      this.model.sportType = newe.sportType;
    }
    if(newe.skillLevel != old.skillLevel){
      this.model.skillLevel = newe.skillLevel;
    }
    if(newe.playType != old.playType){
      this.model.playType = newe.skillLevel;
    }
    if(newe.maxAttendees != old.maxAttendees){
      this.model.maxAttendees = newe.maxAttendees;
    }
    if(newe.description != old.description){
      this.model.description = newe.description;
    }
    if(newe.lat != old.lat){
      this.model.lat = newe.lat.toString();
    }
    if(newe.lng != old.lng){
      this.model.lng = newe.lng.toString();
    }
    
    return this.model;
  }

  private editEvent(){
    sessionStorage.removeItem("eventId");

    this.eventService.updateEvent(this.event.eventId, this.getChanges(this.event, this.eventToEdit))
    .subscribe(
      data => {
        EventService.refreshEventList.next(true);
        //set succes message and pass true parameter to persist the message after redirectin to the main page
        this.alertService.success('Event edited succesfull');
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
