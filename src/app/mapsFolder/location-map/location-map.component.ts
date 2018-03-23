import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit {
  markers = [{
    longitude: 25.6,
    latitude: 65.5,
    tag: 1,
  },
  {

    longitude: 24.9384,
    latitude: 60.1699,
    tag: 'Golf'
  },
  {
    longitude: 23.45,
    latitude: 61.29,
    tag: 'Golf'
  }];

  public latitude: number;
  public longitude: number;

  public searchControl: FormControl;
  public zoom: number;
  message;
  message2;
  displayMarkker = true;
  displayMarkker2 = true;
  windowinfo = false;

  @ViewChild("searchLocation")
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    

    this.zoom = 4;
    this.latitude = 65.0121;
    this.longitude = 25.4651;


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
  dragEnd(event: any)
{
 this.latitude = event.coord.lat;
 this.longitude = event.coord.lng;
}
}
