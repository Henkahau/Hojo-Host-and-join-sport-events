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
  


// locations: string [] = [ 'Oulu', 'Rajakylä', 'Raahe', 'Tampere'];
 skillLevels: string[] = ['Professional', 'Semi-pro','amateur'];
 amountOfPeople:  number []= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
 activity:Activity[]; 
 activitySelected: number;
 message: number;
 message2: number;
 @Output () messageEvent = new EventEmitter<number>();
 sportValues = Object.values(SportType);
 skillValues = Object.values(SkillLevel);
 playTypeValues = Object.values(PlayType);

 eventInfo: any = {};
 
 constructor(private eventService: EventService)
{

} 
 ngOnInit() {
  // this.activity = [
  //   { id:1, sport: "Tennis"},
  //   { id:2, sport: "Icehockey"},
  //   { id:3, sport: "Running"}
  // ];
 // this.activitySelected = 3;

  }
  onActivitySelected(val:any) {
  //  this.sendMessage(val);
   
    this.messageEvent.emit(this.eventInfo);
  }
  onSkillLevelSelected(val2:any)
  {
    this.sendMessage(val2)
  }

  sendMessage(val:any)
  {
  
    this.message =   val;
  
    
  }
  sendLevel(val2: any){
    this.message2 = val2;
    this.messageEvent.emit(this.message2)
  }
}
