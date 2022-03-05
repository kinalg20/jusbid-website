import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelListingPageRoutingModule } from './hotel-listing-page-routing.module';
import { HotelListingPageComponent } from './hotel-listing-page.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelListCardComponent } from './components/hotel-list-card/hotel-list-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { AmenitiesComponent } from './components/filters/amenities/amenities.component';
import { CategoriesComponent } from './components/filters/categories/categories.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    HotelListingPageComponent,
    HotelListComponent,
    HotelListCardComponent,
    FilterComponent,
    AmenitiesComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    HotelListingPageRoutingModule,
    SharedModule,
    CoreModule,
    NgxSliderModule
  ]
})
export class HotelListingPageModule { }
