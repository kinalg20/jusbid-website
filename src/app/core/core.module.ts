import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiRequestService } from './services/api-requests.service';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';
import { SEOService } from './services/seo.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { UtilsService } from './services/utils.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
// import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { IframePipe } from './pipes/iframe.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { IonicModule } from '@ionic/angular';
import { CalendarModule } from "primeng/calendar";

const commonExports: any = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  IonicModule,
  HttpClientModule,
  CalendarModule,
  // NgxShimmerLoadingModule
];

@NgModule({
  declarations: [
    SafeHtmlPipe,
    IframePipe,
    SortPipe
  ],
  imports: [
    CoreRoutingModule,
    ...commonExports,
    
  ],
  exports: [
    ...commonExports,
    SafeHtmlPipe,
    IframePipe,
    SortPipe
  ],
  providers: [
    ApiRequestService,
    ApiService,
    CommonService,
    SEOService,
    AuthenticationService,
    UtilsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule { }
