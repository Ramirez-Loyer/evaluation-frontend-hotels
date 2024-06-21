import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eval-fullstack-frontend';

  constructor(
    private router: Router
  ) {

  }

  newHotel(): void {
    this.router.navigateByUrl('hotelDetail/0');
  }
}
