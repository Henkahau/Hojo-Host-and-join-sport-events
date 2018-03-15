import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output ()public imagePath: string = "http://i0.wp.com/cdn.techgyd.com/save-whatsapp-profile-picture-image3.jpg?resize=337%2C337"
  nappi: boolean = false;
  nimi: string = "Anton Skummaster";
  serverStatus: string = 'offline';


  constructor() { this.serverStatus = Math.random() > 0.5 ? 'online ' : 'offline' }

  ngOnInit() {
  }

  clickPicture() {
    return this.serverStatus;
    
    }
    
  }


