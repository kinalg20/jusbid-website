import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiRequestService } from '../../core/services/api-requests.service';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'flight-header',
  templateUrl: './flight-header.component.html',
  styleUrls: ['./flight-header.component.scss']
})
export class FlightHeaderComponent implements OnInit {
  @Input() header: string = '';
  @Output() searchQueryParams: any = {};
  
  currentUserData: any = {};
  main_header: boolean = false;
  recent_search: any = {};
  departure: any;
  flightDate:any;
  INF : number = 0;
  CNN :number =0;
  ADT : number = 1;
  searchQuery: any;
  is_two_way : boolean = false;

  constructor(public _common: CommonService, 
    private _apiRequestService: ApiRequestService, 
    public datepipe: DatePipe,) { }
    airPortsList: any = [];
  ngOnInit(): void {
    if (this.header == 'main') { this.main_header = true; }
    let reentSerachData = localStorage.getItem("flightSearchKey")
    if (reentSerachData != null) {
      this.recent_search = JSON.parse(reentSerachData);
      this.departure = this.recent_search.departure;
      this.flightDate = this.recent_search.flightDate;
      this.INF = this.recent_search.INF;
      this.CNN = this.recent_search.CNN;
      this.ADT = this.recent_search.ADT;
      this.is_two_way = this.recent_search.is_two_way
    } 

    this._apiRequestService.getUserInformationsByUid(this._common.getLogedinUserData().userId).subscribe(
      res => {
        if (res.responseCode === 200) {
          // console.log("asdfsdfsdfsdfsdsdf", res)
          this.currentUserData = res.data;
        }
      }
    );
    
    this._apiRequestService.getAirPorts().subscribe(
      res => {
        if (res.responseCode) {
          this.airPortsList = res.data;
        }
      }
    );
  }
  showDepartureAirportModel: boolean = false;
  onSearchFlights(form: NgForm) {
    let data = Object.assign({}, form.value);
    var d = new Date(Date.now())
    d.setDate(d.getDate() + 1)
    let searchData = {}
    searchData = {
      from: data.fromcity,
      to: data.tocity,
      guestNo: data.traveller,
      departure: this.datepipe.transform(data.departure, 'MM-dd-yyy'),
      lat: "",
      long: "",
    }
    console.log("flightdata", searchData)
    localStorage.setItem("flight_booking", JSON.stringify(searchData));
  //  this.router.navigate(['/flights-search'], { queryParams: searchData });
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
  logout() {
    this._common.logOut();
  }
  back() {
    window.history.back()
  }
  responsiveSearch: boolean = false;
  showSearch() {
    this.responsiveSearch = !this.responsiveSearch;
  }
}
