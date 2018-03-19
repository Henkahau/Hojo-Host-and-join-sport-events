import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-simplemap',
  templateUrl: './simplemap.component.html',
  styleUrls: ['./simplemap.component.css']
})
export class SimplemapComponent implements OnInit {
  public zoom: number;
  latitude =65.0121;
  longitude =25.4651;

  constructor() { }

  ngOnInit() {
    this.latitude = 65.0121;
    this.longitude = 25.4651;
  }

}
