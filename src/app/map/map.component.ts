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
markers =[ {
  longitude:25.6,
  latitude: 65.5,
  tag: 1
  
  
},
{

  longitude:24.9384,
  latitude: 60.1699,
  tag: 1

},
{
  longitude:23.45,
  latitude: 61.29,
  tag: 2
}]; 

  public latitude: number;
  public longitude: number;
  
  public searchControl: FormControl;
  public zoom: number;
  message;
  displayMarkker = true;
  displayMarkker2 = true;



  
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
         // this.zoom = 12;
        });
      });
    });
  
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
       // this.zoom = 12;
      });
    }
  }


 onChoseLocation(event) {
   this.latitude = event.coords.lat;
   this.longitude = event.coords.lng; 
 }
 receiveMessage($event) {
  this.message = $event
  if(this.message == 3) {
   
    
    
    
  }
  if(this.message == 1) {
    
    
    
  }

 
}
}

