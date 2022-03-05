import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { ShareComponent } from './share.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { CoreModule } from '../core/core.module';
import { FlightHeaderComponent } from './flight-header/flight-header.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NewHotelRegistrationFormComponent } from './pages/new-hotel-registration-form/new-hotel-registration-form.component';
import { BecomeTravelAgentFormComponent } from './pages/become-travel-agent-form/become-travel-agent-form.component';
import { RatingComponent } from './rating/rating.component';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { ListSearchingFormComponent } from './list-searching-form/list-searching-form.component';
import { HotelSearchFormComponent } from './list-searching-form/components/hotel-search-form/hotel-search-form.component';
import { BidFromComponent } from './list-searching-form/components/bid-from/bid-from.component';

import { FlightSerachFormComponent } from './list-searching-form/components/flight-serach-form/flight-serach-form.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicModule } from '@ionic/angular';
// import { NgxStarRatingModule } from 'ngx-star-rating';

const sameComponents = [
  MainFooterComponent,
  MainHeaderComponent,
  FlightHeaderComponent,
  NewHotelRegistrationFormComponent,
  BecomeTravelAgentFormComponent,
  RatingComponent,
  ListSearchingFormComponent
]

@NgModule({
  declarations: [
    ShareComponent,
    ...sameComponents,
    DaterangepickerComponent,
    HotelSearchFormComponent,
    BidFromComponent,
    FlightSerachFormComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ShareRoutingModule,
    BsDatepickerModule.forRoot(),
    Ng2SearchPipeModule,
    // NgxStarRatingModule
    IonicModule.forRoot()
  ],
  exports: [
    ...sameComponents,
    IonicModule
  ]
})
export class ShareModule { }
