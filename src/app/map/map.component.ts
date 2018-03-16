import { Component, OnInit,ElementRef, NgZone,ViewChild } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // latitude =65.0121;
  // longitude =25.4651;
  // locationChosen = false;

  public latitude: number;
  public longitude: number;
  public latitude2: number;
  public longitude2: number;
  public latitude3: number;
  public longitude3: number;
  public latitude4: number;
  public longitude4: number;
  public searchControl: FormControl;
  public zoom: number;

  
 @ViewChild("search")
 public searchElementRef: ElementRef;

 constructor(
   private mapsAPILoader: MapsAPILoader,
   private ngZone: NgZone
 ) {}

  ngOnInit() {
    
    this.zoom = 4;
    this.latitude = 65.0121;
    this.longitude = 25.4651;
    this.latitude2 = 65.2121;
    this.longitude2 = 25.4651;
    this.latitude3 = 65.0421;
    this.longitude3 = 25.4651;
    this.latitude4 = 65.0621;
    this.longitude4 = 25.4651;
    
    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
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
}

