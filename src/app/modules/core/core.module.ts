import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ApiRequestService } from './services/api-requests.service';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ClickOutsideDirective } from './click-outside.directive';
import { SearchPipe } from './pipes/search.pipe';
import { FlightService } from './services/flight.service';
import { SortPipe } from './pipes/sort.pipe';
import { SearchHotelPipe } from './pipes/search-hotel.pipe';
import { PaymentsService } from './services/payments.service';
import { SEOService } from './services/seo.service';
export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    rangeInputFormat: 'DD/MM/YYYY'
  });
}


@NgModule({
  declarations: [
    CoreComponent,
    ClickOutsideDirective,
    SearchPipe,
    SortPipe,
    SearchHotelPipe
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    CarouselModule,
    GooglePlaceModule,
  ],
  providers: [
    ApiRequestService,
    ApiService,
    CommonService,
    DatePipe,
    FlightService,
    PaymentsService,
    SortPipe,
    SearchHotelPipe,
    SEOService
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    CarouselModule,
    GooglePlaceModule,
    SearchPipe,
    SortPipe,
    SearchHotelPipe
  ],
  bootstrap: [CoreComponent]
})

export class CoreModule { }
