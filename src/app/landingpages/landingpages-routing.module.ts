import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewfrontComponent } from './newfront/newfront.component';

const routes: Routes = [
  {
    path:'', component:NewfrontComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingpagesRoutingModule { }
