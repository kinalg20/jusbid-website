import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { AuthGuardService } from './guards/auth-guard.service';
import {LandingpagesModule} from './landingpages/landingpages.module'
import { BecomeTravelAgentFormComponent } from './modules/share/pages/become-travel-agent-form/become-travel-agent-form.component';
import { NewHotelRegistrationFormComponent } from './modules/share/pages/new-hotel-registration-form/new-hotel-registration-form.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'hotels-search',
    loadChildren: () => import('./modules/hotel-booking/hotel-booking.module').then(m => m.HotelBookingModule)
  },
  {
    path: 'hotel',
    loadChildren: () => import('./modules/hotel-booking/hotel-booking.module').then(m => m.HotelBookingModule)
  },
  {
    path: 'ta',
    loadChildren: () => import('./modules/travel-agent-panel/travel-agent-panel.module').then(m => m.TravelAgentPanelModule)
  },
  {
    path: 'bidhistory',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./modules/hotel-booking/hotel-booking.module').then(m => m.HotelBookingModule)
  },
  {
    path: 'bookinghistory',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./modules/hotel-booking/hotel-booking.module').then(m => m.HotelBookingModule)
  },
  {
    path: 'flights-search',
    loadChildren: () => import('./modules/flight-booking/flight-booking.module').then(m => m.FlightBookingModule)
  },
  {
    path: 'profilepage',
    canActivate: [AuthGuardService],
    component: ProfileComponent,
    data: {
      title: "Profile",
      description: "Description Meta Tag Content",
      ogUrl: "your og url"
    }
  },
  {
    path: 'register-your-hotel',
    component: NewHotelRegistrationFormComponent,
    data: {
      title: "Register Hotel On JusBid | List Property on - Jusbid.in",
      description: "Get register your property on Jusbid.in We have a wide range of biding & sorting options so the customer can find exactly what they are looking for as per their budget.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/register-your-hotel",
      ogSiteName: "Jusbid.in",
      canonical: "/register-your-hotel"
    }
  },
  {
    path: 'become-travel-agent',
    component: BecomeTravelAgentFormComponent,
    data: {
      title: "- Travel Agent Booking Platfrom",
      description: "Want to become JusBid Travel Agent? Fill up the form, We will contact you soon.",
      ogType: "company",
      ogTitle: "Jusbid.in: Best online booking biding platfroms for hotels and resorts",
      ogImage: "https://storage.googleapis.com/jusbid_cloud_storage/assets/banner/banner1.jpg",
      ogDescription: "Whether you’re looking for hotel room as per your budget, you’ll always find the. Browse our listed accommodations for all destinations.",
      ogLocale: "en_US",
      ogUrl: "/become-travel-agent",
      ogSiteName: "Jusbid.in",
      canonical: "/become-travel-agent"
    }
  },

  // New routes
  {
    path: 'home',
    loadChildren: () => import('./landingpages/landingpages.module').then(m => m.LandingpagesModule)
  },
  {
    path: 'recent-bids',
    loadChildren: () => import('./recent-bids-page/recent-bids-page.module').then(m => m.RecentBidsPageModule)
  },
  {
    path: 'recent-bookings',
    loadChildren: () => import('./recent-booking-page/recent-booking-page.module').then(m => m.RecentBookingPageModule)
  },
  {
    path: 'hotels-list',
    loadChildren: () => import('./hotel-listing-page/hotel-listing-page.module').then(m => m.HotelListingPageModule)
  },
  {
    path: 'hotels-details',
    loadChildren: () => import('./hotel-detail-page/hotel-detail-page.module').then(m => m.HotelDetailPageModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '', redirectTo: '', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
