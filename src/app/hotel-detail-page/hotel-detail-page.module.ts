import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelDetailPageRoutingModule } from './hotel-detail-page-routing.module';
import { HotelDetailPageComponent } from './hotel-detail-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HotelDetailPageComponent
  ],
  imports: [
    CommonModule,
    HotelDetailPageRoutingModule,
    SharedModule
  ]
})
export class HotelDetailPageModule { }
