import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfilePageRoutingModule } from './user-profile-page-routing.module';
import { UserProfilePageComponent } from './user-profile-page.component';


@NgModule({
  declarations: [
    UserProfilePageComponent
  ],
  imports: [
    CommonModule,
    UserProfilePageRoutingModule
  ]
})
export class UserProfilePageModule { }
