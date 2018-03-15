import { Component, OnInit } from '@angular/core';
import { Event } from '../../_models/index';
import { EventService } from '../../_services/index';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  moduleId: module.id
})
export class CreateEventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
