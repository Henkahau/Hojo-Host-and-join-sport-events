import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  loggaIn = true;

  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(allEvents => {
      this.events = Object.assign([], allEvents);
      console.log(this.events);
    });
  }

}
