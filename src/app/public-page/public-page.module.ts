import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPageRoutingModule } from './public-page-routing.module';
import { PublicPageComponent } from './public-page.component';


@NgModule({
  declarations: [
    PublicPageComponent
  ],
  imports: [
    CommonModule,
    PublicPageRoutingModule
  ]
})
export class PublicPageModule { }
