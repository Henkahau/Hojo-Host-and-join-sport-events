import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit {

  public latitude:  number;
  public longitude: number;
  public latitudeMarker:  number;
  public longitudeMarker: number;
  @Output('receivedLocation') sendLocation  = new EventEmitter<{latitude: number, longitude: number}>();

  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("searchLocation")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    

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
          this.latitudeMarker = this.latitude;
          this.longitudeMarker = this.longitude;
          this.zoom = 12;

          this.sendLocation.emit({
            latitude: this.latitudeMarker,
            longitude: this.longitudeMarker
          });
        });
      });
    });

  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.latitudeMarker = this.latitude;
        this.longitudeMarker = this.longitude;
        this.zoom = 12;

        this.sendLocation.emit({
          latitude: this.latitudeMarker,
          longitude: this.longitudeMarker
        });
      });
    }
  }

  moveMarker(event: any)
  {
    this.latitudeMarker  = event.coords.lat;
    this.longitudeMarker = event.coords.lng;
    this.sendLocation.emit({
      latitude: this.latitudeMarker,
      longitude: this.longitudeMarker
    });
  }

  dragEnd(event: any)
  {
    this.latitudeMarker  = event.coords.lat;
    this.longitudeMarker = event.coords.lng;

    this.sendLocation.emit({
      latitude: this.latitudeMarker,
      longitude: this.longitudeMarker
    });
  }
  dragEnd(event: any)
{
 this.latitude = event.coord.lat;
 this.longitude = event.coord.lng;
}
}
