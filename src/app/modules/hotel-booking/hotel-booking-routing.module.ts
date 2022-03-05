import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelBidhistoryPageComponent } from './containers/hotel-bidhistory-page/hotel-bidhistory-page.component';
import { HotelBookinghistoryPageComponent } from './containers/hotel-bookinghistory-page/hotel-bookinghistory-page.component';
import { HotelDetailPageComponent } from './containers/hotel-detail-page/hotel-detail-page.component';
import { HotelListingPageComponent } from './containers/hotel-listing-page/hotel-listing-page.component';
import { HotelBookingComponent } from './hotel-booking.component';

const routes: Routes = [
  {
    path: '', component: HotelBookingComponent,
    children: [
      {
        path: '', component: HotelListingPageComponent,
        data: {
          title: `Hotel Listing`,
          description: "Description Meta Tag Content",
          ogUrl: "your og url"
        }
      },
      {
        path: 'id/:id', component: HotelDetailPageComponent,
        data: {
          title: `Hotel Details`,
          description: "Description Meta Tag Content",
          ogUrl: "your og url"
        }
      },
      {
        path: 'bid', component: HotelBidhistoryPageComponent,
        data: {
          title: "Biddings",
          description: "Description Meta Tag Content",
          ogUrl: "your og url"
        }
      },
      {
        path: 'booking', component: HotelBookinghistoryPageComponent,
        data: {
          title: "Bookings",
          description: "Description Meta Tag Content",
          ogUrl: "your og url"
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelBookingRoutingModule { }
