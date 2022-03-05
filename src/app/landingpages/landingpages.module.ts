import { NgModule } from '@angular/core';

import { LandingpagesRoutingModule } from './landingpages-routing.module';
import { LandingpagesComponent } from './landingpages.component';
import { SharedModule } from '../shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoreModule } from '../core/core.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { LandingPageModule } from '../modules/landing-page/landing-page.module';
import { NewfrontComponent } from './newfront/newfront.component';

@NgModule({
  declarations: [
    LandingpagesComponent,
    NewfrontComponent,
  ],
  imports: [
    LandingpagesRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    Ng2SearchPipeModule,
    CoreModule,
    GooglePlaceModule,
    LandingPageModule,
  ]
})
export class LandingpagesModule { }
