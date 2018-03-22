import { Component, OnInit } from '@angular/core';
import { EventService } from '../../_services/index';
import { Event } from '../../_models/index';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
  moduleId: module.id
})
export class EditEventComponent implements OnInit {

  event: Event;
  static editEventId: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.loadEvent();
  }

  private loadEvent(){
    this.eventService.getEventById(EditEventComponent.editEventId).subscribe(event => { this.event = event });
  }

}
