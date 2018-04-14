import { Component, OnInit, ElementRef, NgZone, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AgmInfoWindow } from '@agm/core/directives/info-window';
import { InfoWindowManager } from '@agm/core/services/managers/info-window-manager';
import { EventService } from '../../_services';
import { Event } from '../../_models';
import { Marker } from '../../_models/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  events: Event[] = [];

  public latitude: number;
  public longitude: number;
  public radius: number;

  public searchControl: FormControl;
  public zoom: number;
  message;
  eventInfo: any = {};
  public iconImagePath: string = '../../assets/Images/sumo.png'; 

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    protected eventService: EventService) { 
      EventService.refreshEventList.subscribe(res => {
        this.getAllEvents();
      });
     }

  ngOnInit() {

    this.zoom = 10;
    this.latitude = 65.0121;
    this.longitude = 25.4651;
    this.radius = 5;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    this.getAllEvents();
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  receiveMessage(event: any) {
    this.eventInfo = event;

    console.log(this.eventInfo);

    if(this.events != null)
      this.events = [];

    this.getAllEvents();

    // Emit eventInfo to eventlist
    this.eventService.emitEventInfo(this.eventInfo);
  }

  receiveLevel($event) {
    this.message = $event
  }

  onMapClick(event) {
  }

  mouseOverMarker(infoWindow, gm) {
    // if (gm.lastOpen != null) {
    //   gm.lastOpen.close();
    // }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  mouseLeftMarker(infoWindow) {
    infoWindow.close();
  }

  getAllEvents() {
    // this.eventService.getAllEvents().subscribe(allEvents => {
    //   this.events = Object.assign([], allEvents);
    // });

    this.eventInfo.lat = this.latitude;
    this.eventInfo.lng = this.longitude;
    this.eventInfo.radius = this.radius;

    this.eventService.getSpecificEvents(this.eventInfo).subscribe(
      allEvents => {
        this.events = Object.assign([], allEvents);
      },
      error => {
        // In case there is no events
        if(error.status === 200)
          console.log("No events found");
      });
    }
}




