import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentBookingPageComponent } from './recent-booking-page.component';

const routes: Routes = [
  {
    path: '',
    component: RecentBookingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentBookingPageRoutingModule { }
