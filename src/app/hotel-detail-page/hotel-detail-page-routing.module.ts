import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelDetailPageComponent } from './hotel-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: HotelDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelDetailPageRoutingModule { }
