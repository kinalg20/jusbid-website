import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentBookingPageRoutingModule } from './recent-booking-page-routing.module';
import { RecentBookingPageComponent } from './recent-booking-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecentBookingPageComponent
  ],
  imports: [
    CommonModule,
    RecentBookingPageRoutingModule,
    SharedModule
  ]
})
export class RecentBookingPageModule { }
