import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelsComponent } from './components/Hotels/Hotels.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './components/cards/cards.component';
import { ImageComponent } from './components/image/image.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    CardsComponent,
    HotelDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
