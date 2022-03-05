import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { TopBarHeaderComponent } from './components/top-bar-header/top-bar-header.component';
import { ShareModule } from '../share/share.module';
import { CoreModule } from '../core/core.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FaqsComponent } from './public-pages/faqs/faqs.component';
import { TermsAndConditionsComponent } from './public-pages/terms-and-conditions/terms-and-conditions.component';
import { PaymentSecurityComponent } from './public-pages/payment-security/payment-security.component';
import { UserAgreementComponent } from './public-pages/user-agreement/user-agreement.component';
import { ContactUsComponent } from './public-pages/contact-us/contact-us.component';
import { CareerComponent } from './public-pages/career/career.component';
import { BusinessPartnersAgreementComponent } from './public-pages/business-partners-agreement/business-partners-agreement.component';
import { PrivacyPolicyComponent } from './public-pages/privacy-policy/privacy-policy.component';
import { TravelAgentAgreementComponent } from './public-pages/travel-agent-agreement/travel-agent-agreement.component';
import { JusbidBlogsComponent } from './public-pages/jusbid-blogs/jusbid-blogs.component';
import { GuideComponent } from './public-pages/guide/guide.component';
import { JusbidSingleBlogComponent } from './public-pages/jusbid-single-blog/jusbid-single-blog.component';
import { IframePipe } from '../core/pipes/iframe.pipe';
import { TopHeaderSectionComponent } from './components/top-header-section/top-header-section.component';
import { PopularCitiesSectionComponent } from './components/popular-cities-section/popular-cities-section.component';
import { PopularHotelsSectionComponent } from './components/popular-hotels-section/popular-hotels-section.component';
import { BestReachSectionComponent } from './components/best-reach-section/best-reach-section.component';




const ShareComponents = [
  JusbidBlogsComponent,
  JusbidSingleBlogComponent,
]

@NgModule({
  declarations: [
    LandingPageComponent,
    TopBarHeaderComponent,
    FaqsComponent,
    TermsAndConditionsComponent,
    PaymentSecurityComponent,
    UserAgreementComponent,
    ContactUsComponent,
    CareerComponent,
    BusinessPartnersAgreementComponent,
    PrivacyPolicyComponent,
    TravelAgentAgreementComponent,
    GuideComponent,
    IframePipe,
    TopHeaderSectionComponent,
    PopularCitiesSectionComponent,
    PopularHotelsSectionComponent,
    BestReachSectionComponent,
    ...ShareComponents
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ShareModule,
    CoreModule,
    CarouselModule,
    Ng2SearchPipeModule,

  ],

  exports: [
    ...ShareComponents
  ],
  bootstrap: [LandingPageComponent]
})
export class LandingPageModule { }
