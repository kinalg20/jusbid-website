import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoInternetConnectionComponent } from './components/no-internet-connection/no-internet-connection.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HotelSearchFormComponent } from './components/header/hotel-search-form/hotel-search-form.component';



const exportData: any = [
  HeaderComponent,
  FooterComponent,
  NoInternetConnectionComponent,
  LoaderComponent,

]
@NgModule({
  declarations: [
    SharedComponent,
    ...exportData,
    HotelSearchFormComponent,
   
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    ...exportData
  ]
})
export class SharedModule { }
