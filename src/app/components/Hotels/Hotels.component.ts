import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
 listHotels : Hotel[] | undefined;
   constructor() { }

  ngOnInit(): void {
  }

 

}
