import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Activity } from './activity';
import { Event, SportType, SkillLevel, PlayType} from '../_models/index';
import { EventService } from '../_services';

@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent implements OnInit {
  
 activity:Activity[]; 
 activitySelected: number;
 message: number;
 message2: number;
 @Output () messageEvent = new EventEmitter<number>();
 sportValues = Object.values(SportType);
 skillValues = Object.values(SkillLevel);
 playTypeValues = Object.values(PlayType);
 eventInfo: any = {};
 
 constructor(private eventService: EventService){} 

 ngOnInit() {}

  onActivitySelected(val:any)
  {
    this.messageEvent.emit(this.eventInfo);
  }
}
