import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelBookingRoutingModule } from './hotel-booking-routing.module';
import { HotelBookingComponent } from './hotel-booking.component';
import { ShareModule } from '../share/share.module';
import { HotelListingPageComponent } from './containers/hotel-listing-page/hotel-listing-page.component';
import { HotelDetailPageComponent } from './containers/hotel-detail-page/hotel-detail-page.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CoreModule } from '../core/core.module';
import { GalleryModule } from '@ngx-gallery/core';
import { HotelBidhistoryPageComponent } from './containers/hotel-bidhistory-page/hotel-bidhistory-page.component';
import { HotelBookinghistoryPageComponent } from './containers/hotel-bookinghistory-page/hotel-bookinghistory-page.component';
import { IframePipe } from '../pipes/iframe.pipe';
import { JwPaginationModule } from 'jw-angular-pagination';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HotelBookingComponent,
    HotelListingPageComponent,
    HotelDetailPageComponent,
    HotelBidhistoryPageComponent,
    HotelBookinghistoryPageComponent,
    IframePipe,
  ],
  imports: [
    CommonModule,
    HotelBookingRoutingModule,
    NgxSliderModule,
    GalleryModule,
    ShareModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    JwPaginationModule,
    GoogleMapsModule,
  ],
  bootstrap: [HotelBookingComponent]
})
export class HotelBookingModule { }
