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
import { EventViewComponent } from '../../event/event-view';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  events: Event[] = [];
  modalRef: BsModalRef;

  public latitude: number;
  public longitude: number;
  public radius: number;
  playerAmount: number;

  public searchControl: FormControl;
  public zoom: number;
  message;
  eventInfo: any = {};
  public locationImagePath: string = '../../assets/Images/home2.png'; 
  public iconImagePath: string;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    protected eventService: EventService,
    private modalService: BsModalService) { 
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
          this.receiveMessage(this.eventInfo);
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

  receiveMessage(event: any) {
    this.eventInfo = event;

    console.log(this.eventInfo);

    if(this.events != null)
      this.events = [];

    this.getAllEvents();

    // Emit eventInfo to eventlist
    this.eventService.emitEventInfo(this.eventInfo);
  }

  mouseOverMarker(infoWindow, gm, eventId) {
    this.eventService.getEventById(eventId).subscribe(event => {
      if(event[0].players === undefined || event[0].players.length == 0) {
        this.playerAmount = 1;
      }
      else {
        this.playerAmount = event[0].players.length + 1;
      }
    });
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  mouseLeftMarker(infoWindow) {
    infoWindow.close();
  }

  getAllEvents() {
    this.eventInfo.lat = this.latitude;
    this.eventInfo.lng = this.longitude;
    this.eventInfo.radius = this.radius;

    this.eventService.getSpecificEvents(this.eventInfo).subscribe(
      allEvents => {
        this.events = Object.assign([], allEvents);
      },
      error => {
        // In case there is no events
        if(error.status === 200) {
          this.events = [];
        }
      });
    }

    private openEventView(id: string) {
      sessionStorage.setItem("eventId", id);
      this.modalRef = this.modalService.show(EventViewComponent, { class: 'modal-lg' });
    }
    
    imagePath(sporttype: string) {
      return '../../assets/Images/' + sporttype + '.png';
    }
}




