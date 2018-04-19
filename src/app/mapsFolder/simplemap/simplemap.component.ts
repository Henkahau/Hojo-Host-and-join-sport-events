import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../_services';


@Component({
  selector: 'app-simplemap',
  templateUrl: './simplemap.component.html',
  styleUrls: ['./simplemap.component.css']
})
export class SimplemapComponent implements OnInit {

  latitude: number;
  longitude: number;
  @Output() latlng = new EventEmitter<{lat: number, lng: number}>();
  eventID: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventID = sessionStorage.getItem("eventId");
    this.eventService.getEventById(this.eventID).subscribe(res => {
      this.latitude = +res[0].lat;
      this.longitude = +res[0].lng;
      this.latlng.emit({lat: this.latitude, lng: this.longitude});
    });
  }
}
