import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FlightService } from 'src/app/modules/core/services/flight.service';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
@Component({
  selector: 'flight-serach-form',
  templateUrl: './flight-serach-form.component.html',
  styleUrls: ['./flight-serach-form.component.scss']
})
export class FlightSerachFormComponent implements OnInit {
  minDate = new Date();
  flightMinDate = new Date();
  flight_Date_back = new Date();
  returnMinDate = new Date();
  maxDate = new Date();
  returnDate = new Date();
  totaltravellersCount: number = 1;
  fixed_header: boolean = false;
  adultCount: number = 1;
  childCount: number = 0;
  infantCount: number = 0;
  constructor(public router: Router,
    public datepipe: DatePipe,
    private flightService: FlightService,
    public _apiRequest :ApiRequestService) { 

      this.flightMinDate.setDate(this.minDate.getDate() + 1);
      this.flight_Date_back.setDate(this.minDate.getDate() + 2);
    }

  ngOnInit(): void {
    this.startdateSelect = this.flightMinDate;
    this.ReturnDateSelect = this.flight_Date_back;

    this._apiRequest.getAirPorts().subscribe(
      res => {
        if (res.responseCode) {
          console.log("air ports: ", res);
          this.airPortsList = res.data;
        }
      }
    )
  }
  airPortsList: any = [];
  onSearchFlights(form: NgForm) {
    let data = Object.assign({}, form.value);
    var d = new Date(Date.now())
    d.setDate(d.getDate() + 1)
    let searchData = {}
    searchData = {
      from: data.fromcity,
      to: data.tocity,
      guestNo: data.traveller,
      departure: this.datepipe.transform(data.departure, 'dd-MM-yyy'),
      lat: "",
      long: "",
    }
    console.log("flightdata", searchData)
    localStorage.setItem("flight_booking", JSON.stringify(searchData));
    this.router.navigate(['/flights-search'], { queryParams: searchData });
  }
  showArrivalAirportModel: boolean = false;
  getArrivalAirportInput(event: any) {
    if (event.target.value.length > 0) {
      this.showArrivalAirportModel = true;
    } else {
      this.showArrivalAirportModel = false;
    }
  }
  arrivalAirport: string = 'New Delhi (DEL)';
  arrivalAirportCODE: string = 'DEL';

  getArrivalAirport(city: string, code: string) {
    this.arrivalAirportCODE = code;
    this.arrivalAirport = city + ' (' + code + ')';
    this.showArrivalAirportModel = false;
  }

  startdateSelect: any;
  ReturnDateSelect: any;
  show_room: boolean = false;

  showAddRoom(event: any) {
    this.show_room = !this.show_room;
  }
  childrens: any = [];
  infants: any = [];

  getTravellersDetails(form: NgForm) {
    this.totaltravellersCount = this.adultCount + this.childCount + this.infantCount;
    this.show_room = false;
    let data = Object.assign({}, form.value);

    for (let key of Object.keys(data)) {
      if (key.startsWith('child_dob')) {
        this.childrens.push({
          CNN: this.flightService.getAge(data[key]),
          DOB: data[key]
        });
      } else if (key.startsWith('infant_dob')) {
        this.infants.push({
          INF: this.flightService.getAge(data[key]),
          DOB: data[key]
        });
      }
    }
    console.log("data", this.childrens);
    console.log("data", this.infants);
  }

  TripType: boolean = false;
  showaddTrip(event: any) {
    this.TripType = !this.TripType
  }
  Trip_Type: string = 'O';
  setTripType(type: string) {
    this.TripType = false;
    this.Trip_Type = type;
  }

  searchTrue(searchTerm: string) {
    this.airPortsList.filter((data: any) => {
      return data.airport_name.toLowerCase().match(searchTerm.toLowerCase()) || data.city_name.toLowerCase().match(searchTerm.toLowerCase()) || data.IATA_code.toLowerCase().match(searchTerm.toLowerCase())
    });
  }

  public roomsSelector: any[] = [
    {
      id: 1,
      total_guest: 1
    }
  ];
  GuestCount: number = 1;
   // Adult counts
   max_ADT: number = 9;
   increaseAdultCount() {
     if (this.adultCount >= this.max_ADT) {
       this.adultCount = this.max_ADT;
     } else {
       this.adultCount++;
     }
   }
 
   descreseAdultCount() {
     if (this.adultCount == 1) {
       this.adultCount = 1;
     } else {
       this.adultCount--;
     }
   }
 
   // Child counts
   max_CNN: number = 9;
   increaseChildCount() {
     if (this.childCount >= this.max_CNN) {
       this.childCount = this.max_CNN;
     } else {
       this.childCount++;
     }
   }
 
   descreseChildCount() {
     if (this.childCount == 0) {
       this.childCount = 0;
     } else {
       this.childCount--;
     }
   }
 
   // Infant counts
   max_INF: number = 9;
   increaseInfantCount() {
     if (this.infantCount >= this.max_INF) {
       this.infantCount = this.max_INF;
     } else {
       this.infantCount++;
     }
   }
 
   descreseInfantCount() {
     if (this.infantCount == 0) {
       this.infantCount = 0;
     } else {
       this.infantCount--;
     }
   }

   searchFlights(trip_Type: string) {
     let params: any = {
       departure: this.departureAirportCODE,
       ...(trip_Type === 'R' && { arrival_back: this.departureAirportCODE }),
       arrival: this.arrivalAirportCODE,
       ...(trip_Type === 'R' && { departure_back: this.arrivalAirportCODE }),
       flightDate: this.startdateSelect ? this.datepipe.transform(this.startdateSelect, 'dd-MM-yyy') : this.datepipe.transform(this.flightMinDate, 'dd-MM-yyy'),
       ...(trip_Type === 'R' && { flightDate_back: this.datepipe.transform(this.ReturnDateSelect, 'dd-MM-yyy') }),
       is_two_way: trip_Type === 'R' ? true : false,
       ADT: this.adultCount,
       INF: this.infantCount,
       CNN: this.childCount,
       // ADT_ALL: [],
       // CNN_ALL: this.childrens,
       // INF_ALL: this.infants,
     }
     localStorage.setItem('flightSearchKey', JSON.stringify(params));
     this.router.navigate(['/flights-search'], { queryParams: params });
   }
   departureAirport: string = 'Udaipur (UDR)';
   departureAirportCODE: string = 'UDR';
   is_select_departure: boolean = false;
   getDepartureAirport(city: string, code: string) {
     this.departureAirportCODE = code;
     this.departureAirport = city + ' (' + code + ')';
     this.showDepartureAirportModel = false;
     this.is_select_departure = this.departureAirportCODE ? true : false;
   }
   showDepartureAirportModel: boolean = false;
  getDepartureAirportInput(event: any) {
    if (event.target.value.length > 0 && this.departureAirport.length >= 1) {
      this.showDepartureAirportModel = true;
    } else {
      this.showDepartureAirportModel = false;
    }
  }
}
