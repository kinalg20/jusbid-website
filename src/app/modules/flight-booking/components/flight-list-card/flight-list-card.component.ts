import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';

@Component({
  selector: 'flight-list-card',
  templateUrl: './flight-list-card.component.html',
  styleUrls: ['./flight-list-card.component.scss']
})
export class FlightListCardComponent implements OnInit {
  active: number = 0;
  @Input() for_open_round_trip_val: boolean = true;
  @Input() flightDetails: any = {};
  @Input() searchQueryParams: any = {};
  @Input() currentIndex: number = 0;
  @Input() FareInfoList: any = [];
  @Input() airPortsList: any = [];
  showDetailsCard: boolean = false;
  flightPriceDetails: any = [];
  flightPriceDetailsObj: any = [];
  @Input() airLinesData: any = [];

  BaggageAllowanceObj: any = {};

  flightDetailObj: any = {};
  AirPricingInfo: any = [];

  constructor(public apiRequestService: ApiRequestService, private router: Router) { }

  ngOnInit(): void {

    if (this.flightDetails.Key && this.flightDetails.customSegment.length != 0) {
      this.flightDetailObj = {
        ...this.flightDetails,
        airlines: this.getAirlineObj(this.flightDetails?.customSegment[0]?.Carrier),
        bookingInfoObj: this.flightDetails,
        indexFlight: this.flightDetails?.indexFlight
      };
    }

    let bookingInfo: any = this.flightDetails['air:AirPricingInfo']['air:FlightOptionsList']['air:FlightOption']['air:Option']['air:BookingInfo'];
    console.log('this.flightDetailssdfsdfsdfsdf', bookingInfo)

    let booking_Info_Obj = this.flightDetails?.bookingInfoObj;
    if (booking_Info_Obj != undefined) {
      let FareInfoRefKey = '';
      if (Array.isArray(booking_Info_Obj)) {
        booking_Info_Obj.forEach((booking_info: any) => {
          FareInfoRefKey = booking_info.FareInfoRef;
        });
      } else {
        FareInfoRefKey = booking_Info_Obj.FareInfoRef;
      }
      this.FareInfoList.forEach((fareInfo: any) => {
        // console.log("Fareinfo:", fareInfo)
        if (FareInfoRefKey === fareInfo.Key) {
          this.flightDetailObj['fareInfo'] = fareInfo;
        }
      });

    }


    if (Array.isArray(this.flightDetails['air:AirPricingInfo']['air:FareInfoRef'])) {
      this.flightDetails['air:AirPricingInfo']['air:FareInfoRef'].forEach((fareInfoRef: any) => {
        this.FareInfoList.forEach((fareInfo: any) => {
          if (fareInfoRef.Key === fareInfo.Key) {
            this.flightDetailObj['fareInfo'] = fareInfo;
            // console.log("Array : Fareinfo:", this.flightDetailObj['fareInfo'])
          }
        });
      });
    } else {
      let fareKey = this.flightDetails['air:AirPricingInfo']['air:FareInfoRef']['Key'];
      this.FareInfoList.forEach((fareInfo: any) => {
        if (fareKey === fareInfo.Key) {
          this.flightDetailObj['fareInfo'] = fareInfo;
          // console.log("Obj Fareinfo:", this.flightDetailObj['fareInfo'])
        }
      });

    }


    this.AirPricingInfo = this.flightDetailObj['air:AirPricingInfo'];

    console.log("this.flightDetailObj", this.flightDetailObj)

  }

  getAirlineObj(CarrierCode: string) {
    let airLineObj: any = {};
    this.airLinesData.forEach((airline: any) => {
      if (airline.IATA === CarrierCode) {
        airLineObj = airline;
      }
    });
    return airLineObj;
  }

  getSuffix(dateStr: any) {
    let date: any = new Date(dateStr);
    let h: any = date.getHours();
    let m: any = date.getMinutes();
    let s: any = date.getSeconds();
    return (h >= 12) ? 'PM' : 'AM';
  }


  getCityNameByIATA_Code(IATA_code: any) {
    let cityName: any = "";
    this.airPortsList.forEach((airPort: any) => {
      if (airPort.IATA_code === IATA_code) {
        cityName = airPort.city_name;
      }
    });
    return cityName;
  }

  getData() { }

  getPrice(price: any) {
    let priceValue = price ? price.slice(3, price.length) : 0;
    return JSON.parse(priceValue);
  }

  showDetails() {
    this.showDetailsCard = !this.showDetailsCard;
  }

  tabChange(index: number) {
    this.active = index;
  }

  seconds_to_days_hours_mins_secs_str(mins: any) {
    let h: any = Math.floor(mins / 60), m: any = mins % 60;
    h = h < 10 ? '' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}hrs ${m}mins`;
  }


  fareInfo: any = {
    terms_and_conditions: null
  }

  goToDetailsPage(data: any) {
    console.log('data detila', data);
    this.apiRequestService.setDetailPageData({ ...data, searchQueryParams: this.searchQueryParams, airLinesData: this.airLinesData });
    this.router.navigate(['/flights-search/flight-details']);
  }


}
