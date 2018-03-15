import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent implements OnInit {
  laji:string

 sports: string[] = ['Icehockey', 'Basketball', 'Tennis', 'Running'];
 locations: string [] = [ 'Oulu', 'Rajakylä', 'Raahe', 'Tampere'];
 skillLevels: string[] = ['Professional', 'Semi-pro','amateur'];
 amountOfPeople:  number []= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
  ngOnInit() {
  }

}
