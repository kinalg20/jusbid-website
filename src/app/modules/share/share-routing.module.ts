import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { BidFromComponent } from './list-searching-form/components/bid-from/bid-from.component';

const routes: Routes = [
  {
    path:'Best-hotel-room-deals', component:BidFromComponent,
    canActivate: [AuthGuardService],
    data: {
      title: "Best-hotel-room-deals",
      description: "Description Meta Tag Content",
      ogUrl: "your og url"
    }
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareRoutingModule { }
