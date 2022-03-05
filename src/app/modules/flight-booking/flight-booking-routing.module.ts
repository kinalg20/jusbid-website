import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightDetailPageComponent } from './containers/flight-detail-page/flight-detail-page.component';
import { FlightListingPageComponent } from './containers/flight-listing-page/flight-listing-page.component';

import { FlightBookingComponent } from './flight-booking.component';
import { FlightCommimngSoonComponent } from './flight-commimng-soon/flight-commimng-soon.component';

const routes: Routes = [
  {
    path: '', component: FlightBookingComponent,
    children: [
      {
        path : 'flightSoon', component:FlightCommimngSoonComponent , 
      },
      {
        path: '', component: FlightListingPageComponent
      },
      {
        // path: 'flight-details', component: FlightDetailPageComponent
        path: 'flight-details', component: FlightCommimngSoonComponent
      },
      // {
      //   path: 'flight-list', component: FlightListTestComponent
      // },
      // {
      //   path: 'flight-bookings', component: FlightsBookingComponent
      // },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightBookingRoutingModule { }
