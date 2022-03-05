import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentBidsPageRoutingModule } from './recent-bids-page-routing.module';
import { RecentBidsPageComponent } from './recent-bids-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecentBidsPageComponent
  ],
  imports: [
    CommonModule,
    RecentBidsPageRoutingModule,
    SharedModule
  ]
})
export class RecentBidsPageModule { }
