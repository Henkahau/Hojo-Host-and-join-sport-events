import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Activity } from './activity';
import { Event, SportType, SkillLevel, PlayType} from '../_models/index';

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
 @Output () messageEvent = new EventEmitter<number>();
 sportValues = Object.values(SportType);
 skillValues = Object.values(SkillLevel);
 playTypeValues = Object.values(PlayType);
 
 
 ngOnInit() {
  this.activity = [
    { id:1, sport: "Tennis"},
    { id:2, sport: "Icehockey"},
    { id:3, sport: "Running"}
  ];
  this.activitySelected = 3;

  }
  onActivitySelected(val:any)
  {

    this.sendMessage(val);
  }

  sendMessage(val:any)
  {
  
    this.message =   val;
    this.messageEvent.emit(this.message);
  }

}
