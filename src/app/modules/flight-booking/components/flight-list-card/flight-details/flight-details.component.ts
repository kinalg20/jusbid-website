import { Component, Input, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';

@Component({
  selector: 'flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

  @Input() flightSegment: any = {};
  @Input() airLineData: any = [];
  @Input() bookingInfoObj: any = {};
  @Input() airPortsList: any = [];

  relatedFlightDetails: any = {};

  constructor(public apiRequestService: ApiRequestService) { }

  ngOnInit(): void {
    this.relatedFlightDetails = { ...this.flightSegment, bookingInfoObj: this.bookingInfoObj };
  }

  seconds_to_days_hours_mins_secs_str(mins: any) {
    let h: any = Math.floor(mins / 60), m: any = mins % 60;
    h = h < 10 ? '' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}hrs ${m}mins`;
  }

  getPrice(price: any) {
    let priceValue = price ? price.slice(3, price.length) : 0;
    return JSON.parse(priceValue);
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

  getAirPortNameByIATA_Code(IATA_code: any) {
    let airPortName: any = "";
    this.airPortsList.forEach((airPort: any) => {
      if (airPort.IATA_code === IATA_code) {
        airPortName = airPort.airport_name;
      }
    });
    return airPortName;
  }

  getAirlineObj(CarrierCode: string) {
    let airLineObj: any = {};
    this.airLineData.forEach((airline: any) => {
      if (airline.IATA === CarrierCode) {
        airLineObj = airline;
      }
    });
    return airLineObj;
  }

}
