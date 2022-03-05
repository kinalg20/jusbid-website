import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentBidsPageComponent } from './recent-bids-page.component';

const routes: Routes = [
  {
    path: '',
    component: RecentBidsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentBidsPageRoutingModule { }
