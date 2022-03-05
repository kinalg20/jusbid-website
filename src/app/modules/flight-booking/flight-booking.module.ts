import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { FlightBookingComponent } from './flight-booking.component';
import { ShareModule } from '../share/share.module';
import { FlightListingPageComponent } from './containers/flight-listing-page/flight-listing-page.component';
import { FlightDetailPageComponent } from './containers/flight-detail-page/flight-detail-page.component';
import { FlightListSectionComponent } from './components/flight-list-section/flight-list-section.component';
import { FlightListCardComponent } from './components/flight-list-card/flight-list-card.component';
import { FlightBookingDetailsCardComponent } from './components/flight-booking-details-card/flight-booking-details-card.component';
import { FlightsFiltersSectionComponent } from './components/flights-filters-section/flights-filters-section.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FlightRoundTripListCardComponent } from './components/flight-round-trip-list-card/flight-round-trip-list-card.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CoreModule } from '../core/core.module';
import { FareInformationComponent } from './components/flight-list-card/fare-information/fare-information.component';
import { CancellationPolicyComponent } from './components/flight-list-card/cancellation-policy/cancellation-policy.component';
import { BaggageRulesComponent } from './components/flight-list-card/baggage-rules/baggage-rules.component';
import { FlightDetailsComponent } from './components/flight-list-card/flight-details/flight-details.component';
import { TravellerDetailsAdultsFormComponent } from './containers/flight-detail-page/components/traveller-details-adults-form/traveller-details-adults-form.component';
import { TravellerDetailsChildFormComponent } from './containers/flight-detail-page/components/traveller-details-child-form/traveller-details-child-form.component';
import { TravellerDetailsInfantFormComponent } from './containers/flight-detail-page/components/traveller-details-infant-form/traveller-details-infant-form.component';
import { BookingDetailsContactFormComponent } from './containers/flight-detail-page/components/booking-details-contact-form/booking-details-contact-form.component';
import { BookingGstDetailsFormComponent } from './containers/flight-detail-page/components/booking-gst-details-form/booking-gst-details-form.component';
import { BookingShippingAddressDetailsFormComponent } from './containers/flight-detail-page/components/booking-shipping-address-details-form/booking-shipping-address-details-form.component';
import { FlightBookingConfirmationComponent } from './containers/flight-detail-page/components/flight-booking-confirmation/flight-booking-confirmation.component';
import { FlightCommimngSoonComponent } from './flight-commimng-soon/flight-commimng-soon.component';


@NgModule({
  declarations: [
    FlightBookingComponent,
    FlightListingPageComponent,
    FlightDetailPageComponent,
    FlightListSectionComponent,
    FlightListCardComponent,
    FlightRoundTripListCardComponent,
    FlightBookingDetailsCardComponent,
    FlightsFiltersSectionComponent,
    FareInformationComponent,
    CancellationPolicyComponent,
    BaggageRulesComponent,
    FlightDetailsComponent,
    TravellerDetailsAdultsFormComponent,
    TravellerDetailsChildFormComponent,
    TravellerDetailsInfantFormComponent,
    BookingDetailsContactFormComponent,
    BookingGstDetailsFormComponent,
    BookingShippingAddressDetailsFormComponent,
    FlightBookingConfirmationComponent,
    FlightCommimngSoonComponent,
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    FlightBookingRoutingModule,
    BsDatepickerModule.forRoot(),
    ShareModule,
    CoreModule,
  ],
  exports: []
})
export class FlightBookingModule { }
