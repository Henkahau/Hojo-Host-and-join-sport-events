import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Event } from '../../_models/index';
import { UserService, EventService } from '../../_services/index';
import { EventViewComponent } from '../../event/event-view';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

  events: Event[] = [];
  modalRef: BsModalRef;
  eventInfo: any = {};

  constructor(
    private userService: UserService,
    protected eventService: EventService,
    private modalService: BsModalService) {
    EventService.refreshEventList.subscribe(res => {
      this.loadEvents();
    });
  }

  ngOnInit() {
    this.loadEvents();
    this.filteredEvents();
  }

  loadEvents() {
    // this.eventService.getAllEvents().subscribe(events => { this.events = events });

    // Catch filters emitted from map.component
    this.eventService.eventInfo.subscribe(res => {
      this.eventInfo = res;
      console.log(this.eventInfo);
      this.filteredEvents();
    });
  }

  private openEventView(id: string) {
    sessionStorage.setItem("eventId", id);
    this.modalRef = this.modalService.show(EventViewComponent, { class: 'modal-lg' });
  }

  filteredEvents() {
    this.eventService.getSpecificEvents(this.eventInfo).subscribe(
      events => {
        this.events = Object.assign([], events);
      },
      error => {
        // In case there is no events
        if (error.status === 200)
          console.log("No events found");
          this.events = [];
      });
  }
}
