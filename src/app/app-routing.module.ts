import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/Hotels/Hotels.component';
import { CardsComponent } from './components/cards/cards.component';
import { ImageComponent } from './components/image/image.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { HotelsListComponent } from './components/hotels-list/hotels-list.component';

const routes: Routes = [
  {path : 'hotels', component : HotelsComponent}, 
  {path : 'cards', component : CardsComponent}, 
  { path : 'hotelDetail', component : HotelDetailComponent}, 
  { path : 'hotelsList', component: HotelsListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
