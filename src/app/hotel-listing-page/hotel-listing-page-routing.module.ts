import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelListingPageComponent } from './hotel-listing-page.component';

const routes: Routes = [
  {
    path: '',
    component: HotelListingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelListingPageRoutingModule { }
