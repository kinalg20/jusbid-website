import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';
import { BusinessPartnersAgreementComponent } from './public-pages/business-partners-agreement/business-partners-agreement.component';
import { CareerComponent } from './public-pages/career/career.component';
import { ContactUsComponent } from './public-pages/contact-us/contact-us.component';
import { FaqsComponent } from './public-pages/faqs/faqs.component';
import { JusbidBlogsComponent } from './public-pages/jusbid-blogs/jusbid-blogs.component';
import { GuideComponent } from './public-pages/guide/guide.component';
import { PaymentSecurityComponent } from './public-pages/payment-security/payment-security.component';
import { PrivacyPolicyComponent } from './public-pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './public-pages/terms-and-conditions/terms-and-conditions.component';
import { TravelAgentAgreementComponent } from './public-pages/travel-agent-agreement/travel-agent-agreement.component';
import { UserAgreementComponent } from './public-pages/user-agreement/user-agreement.component';
import { BidFromComponent } from '../share/list-searching-form/components/bid-from/bid-from.component';
import { JusbidSingleBlogComponent } from './public-pages/jusbid-single-blog/jusbid-single-blog.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
    data: {
      title: "- #1 Online Hotel Booking Platform | The best budget hotels & accommodations | Budget Hotels",
      description: "Looking for the best budget hotels for your next trip? Book your next trip with JusBid. Browse hotels and Put a bid on the best hotels and get a hotel as per your budget.",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogLocale: "en_US",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogSiteName: "Jusbid.in",
      ogUrl: "/",
      ogType: "company",
      canonical: "/"
    }
  },
  {
    path: 'faqs', component: FaqsComponent,
    data: {
      title: "- FAQ's",
      description: "Do you have a question about JusBid? Readout JusBid FAQ's.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/faqs",
      ogSiteName: "Jusbid.in",
      canonical: "/faqs"
    }
  },
  {
    path: 'terms-and-condition', component: TermsAndConditionsComponent,
    data: {
      title: "JusBid - Term and Condition",
      description: "Jusbid.in - Read Out Our Term and Conditions",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/terms-and-condition",
      ogSiteName: "Jusbid.in",
      canonical: "/terms-and-condition"
    }
  },
  {
    path: 'Payment-security', component: PaymentSecurityComponent,
    data: {
      title: "- Payment Security",
      description: "Jusbid.in ensures that every transaction you conduct over the website or mobile application is executed safely and securely.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/Payment-security",
      ogSiteName: "Jusbid.in",
      canonical: "/Payment-security"
    }
  },
  {
    path: 'user-agreement', component: UserAgreementComponent,
    data: {
      title: " - User Agreement",
      description: "Jusbid.in - Read Out Our User Agreement.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/user-agreement",
      ogSiteName: "Jusbid.in",
      canonical: "/user-agreement"
    }
  },
  {
    path: 'contact-us', component: ContactUsComponent,
    data: {
      title: "Contact Us - JusBid Customer Care | Contact Support | Help Line (24*7)- Jusbid.in",
      description: "JusBid Team is available 24*7 for their valuable customer. If you have any queries, you can freely contact on our given support details.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/contact-us",
      ogSiteName: "Jusbid.in",
      canonical: "/contact-us"
    }
  },
  {
    path: 'career', component: CareerComponent,
    data: {
      title: "- Career",
      description: "At Jusbid.in, we make it more comfortable for everyone to experience the world. Explore your career in a digital platform.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/career",
      ogSiteName: "Jusbid.in",
      canonical: "/career"
    }
  },
  {
    path: 'business-partner-agreement', component: BusinessPartnersAgreementComponent,
    data: {
      title: "- Business Partner Agreement",
      description: "Jusbid.in - Read Out Our Business Partner Agreement.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/business-partner-agreement",
      ogSiteName: "Jusbid.in",
      canonical: "/business-partner-agreement"
    }
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent,
    data: {
      title: "- Privacy Policy",
      description: "Jusbid.in - Read Out Our Privacy Policy.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/privacy-policy",
      ogSiteName: "Jusbid.in",
      canonical: "/privacy-policy"
    }
  },
  {
    path: 'travel-agent-agreement', component: TravelAgentAgreementComponent,
    data: {
      title: "- Travel Agent Booking Platfrom",
      description: "Want to become JusBid Travel Agent? Fill up the form, We will contact you soon.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/travel-agent-agreement",
      ogSiteName: "Jusbid.in",
      canonical: "/travel-agent-agreement"
    }
  },
  {
    path: 'blogs', component: JusbidBlogsComponent,
    data: {
      title: "- Travel Agent Booking Platfrom",
      description: "Want to become JusBid Travel Agent? Fill up the form, We will contact you soon.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/travel-agent-agreement",
      ogSiteName: "Jusbid.in",
      canonical: "/travel-agent-agreement"
    }
  },
  {
    path: 'blogs/:city/:slug', component: JusbidSingleBlogComponent,
    data: {
      title: "- Travel Agent Booking Platfrom",
      description: "Want to become JusBid Travel Agent? Fill up the form, We will contact you soon.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/travel-agent-agreement",
      ogSiteName: "Jusbid.in",
      canonical: "/travel-agent-agreement"
    }
  },
  {
    path: 'guide', component: GuideComponent,
    data: {
      title: "Guide",
      description: "Description Meta Tag Content",
      ogUrl: "your og url"
    }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
