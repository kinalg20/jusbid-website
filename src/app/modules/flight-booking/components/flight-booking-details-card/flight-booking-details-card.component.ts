import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { CommonService } from 'src/app/modules/core/services/common.service';

@Component({
  selector: 'flight-booking-details-card',
  templateUrl: './flight-booking-details-card.component.html',
  styleUrls: ['./flight-booking-details-card.component.scss']
})
export class FlightBookingDetailsCardComponent implements OnInit {

  @Input() searchQuery: any = {};
  airPortsList: any = [];

  is_open_dropdown: boolean = false;
  swap_destination: boolean = false;
  is_open_round_trip: boolean = false;
  item: number = 0;
  minDate = new Date();
  maxDate = new Date();
  returnDate = new Date();
  recent_search: any = {};
  sum: number = 0;

  departure: string = '';
  arrival: string = '';
  flightDate: string = '';

  departureAirport: string = '';
  departureAirportCODE: string = '';
  showDepartureAirportModel: boolean = false;
  ArrivalAirport: string = '';
  ArrivalAirportCODE: string = '';
  showArrivalAirportModel: boolean = false;

  constructor(public datepipe: DatePipe, public apiRequestService: ApiRequestService, private router: Router, public __commonService: CommonService) {
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 90);
    this.returnDate.setDate(this.minDate.getDate() + 1);
  }

  public travellerSelector: any[] = [
    {
      id: 1,
      total_guest: 1
    }
  ];


  ngOnInit(): void {
    if (this.searchQuery) {
      this.adultCount = this.searchQuery.ADT;
      this.childCount = this.searchQuery.CNN;
      this.infantCount = this.searchQuery.INF;
      this.departureAirportCODE = this.searchQuery.departure;
      this.ArrivalAirportCODE = this.searchQuery.arrival;
      this.flightDate = this.searchQuery.flightDate;
      this.departureAirport = this.searchQuery.departure;
      this.ArrivalAirport = this.searchQuery.arrival;
      this.selected_isTwoWayTrip = JSON.parse(this.searchQuery.is_two_way);
    }
    this.apiRequestService.getAirPorts().subscribe(
      res => {
        this.airPortsList = res.data;
      }
    );
  }

  swapDestination() {
    this.swap_destination = !this.swap_destination;
    console.log("this.swap_destination", this.swap_destination)
    this.departureAirport = this.ArrivalAirport;
    this.ArrivalAirport = this.departureAirport;
    // this.departureAirport = this.swap_destination ? this.ArrivalAirport : this.departureAirport;
    // this.ArrivalAirport = this.swap_destination ? this.departureAirport : this.ArrivalAirport;
  }

  openDropdown() {
    this.is_open_dropdown = !this.is_open_dropdown;
  }

  @Output() Roundtrip = new EventEmitter<boolean>();

  selected_isTwoWayTrip: boolean = false;
  toggleFlightTripList(isTwoWayTrip: boolean) {
    this.selected_isTwoWayTrip = isTwoWayTrip;
    this.Roundtrip.emit(isTwoWayTrip);
  }

  increaseGuest(i: number) {
    this.travellerSelector[i].total_guest++;
  }

  descreseGuest(i: number) {
    if (this.travellerSelector[i].total_guest > 1) {
      this.travellerSelector[i].total_guest--;
    }
  }

  onSearchRecentFlights(form: NgForm) {
    this.__commonService.is_list_load = true;
    let data = Object.assign({}, form.value);
    let params = {
      ADT: Number(this.adultCount),
      CNN: Number(this.childCount),
      INF: Number(this.infantCount),
      departure: this.departureAirportCODE ? this.departureAirportCODE : this.departureAirportCODE,
      ...(this.searchQuery.is_two_way && { departure_back: this.ArrivalAirportCODE ? this.ArrivalAirportCODE : this.ArrivalAirportCODE, }),
      arrival: this.ArrivalAirportCODE ? this.ArrivalAirportCODE : this.ArrivalAirportCODE,
      ...(this.searchQuery.is_two_way && { arrival_back: this.departureAirportCODE ? this.departureAirportCODE : this.departureAirportCODE }),
      flightDate: data.flightDate ? this.datepipe.transform(data.flightDate, 'yyy-MM-dd') : this.flightDate,
      ...(this.searchQuery.is_two_way && { flightDate_back: this.datepipe.transform(data.flightDate_back, 'yyy-MM-dd'), }),
      is_two_way: this.searchQuery.is_two_way
    };
    console.log("Form data:", params)
    this.router.navigate(['/flights-search'], { queryParams: params });
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



  adultCount: number = 1;
  childCount: number = 0;
  infantCount: number = 0;
  totaltravellersCount: number = 1;
  show_room: boolean = false;

  selectTravellers() {
    this.totaltravellersCount = this.adultCount + this.childCount + this.infantCount;
    this.show_room = false;
  }

  // Adult counts
  increaseAdultCount() {
    this.adultCount++;
  }
  descreseAdultCount() {
    if (this.adultCount == 1) {
      this.adultCount = 1;
    } else {
      this.adultCount--;
    }
  }
  // Child counts
  increaseChildCount() {
    this.childCount++;
  }
  descreseChildCount() {
    if (this.childCount == 0) {
      this.childCount = 0;
    } else {
      this.childCount--;
    }
  }
  // Infant counts
  increaseInfantCount() {
    this.infantCount++;
  }
  descreseInfantCount() {
    if (this.infantCount == 0) {
      this.infantCount = 0;
    } else {
      this.infantCount--;
    }
  }


  isOneWayTrip: boolean = true;

  setTripType() {
    this.isOneWayTrip = !this.isOneWayTrip;
  }


  getDepartureAirport(city: string, code: string) {
    this.departureAirportCODE = code;
    this.departureAirport = city + ' (' + code + ')';
    this.showDepartureAirportModel = false;
  }

  getDepartureAirportInput(event: any) {
    if (event.target.value.length > 0 && this.departureAirport.length >= 1) {
      this.showDepartureAirportModel = true;
    } else {
      this.showDepartureAirportModel = false;
    }
  }


  getArrivalAirport(city: string, code: string) {
    this.ArrivalAirportCODE = code;
    this.ArrivalAirport = city + ' (' + code + ')';
    this.showArrivalAirportModel = false;
  }

  getArrivalAirportInput(event: any) {
    if (event.target.value.length > 0 && this.ArrivalAirport.length >= 1) {
      this.showArrivalAirportModel = true;
    } else {
      this.showArrivalAirportModel = false;
    }
  }

}
