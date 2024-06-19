import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/Hotels/Hotels.component';
import { CardsComponent } from './components/cards/cards.component';
import { ImageComponent } from './components/image/image.component';

const routes: Routes = [
  {path : 'hotels', component : HotelsComponent}, 
  {path : 'cards', component : CardsComponent}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
