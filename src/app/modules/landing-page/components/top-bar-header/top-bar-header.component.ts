import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { interval, Observable } from 'rxjs';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { CommonService } from 'src/app/modules/core/services/common.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import * as $ from "jquery";
import { HttpClient } from '@angular/common/http';
import { FlightService } from 'src/app/modules/core/services/flight.service';


declare var google: any;
@Component({
  selector: 'top-bar-header',
  templateUrl: './top-bar-header.component.html',
  styleUrls: ['./top-bar-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarHeaderComponent implements OnInit {


  adultCount: number = 1;
  childCount: number = 0;
  infantCount: number = 0;
  totaltravellersCount: number = 1;


  bsValue: Date = new Date();
  hoteldata: any = [];
  popularHotels: any = [];
  popularCities: any = [];
  citiesList: any = [];
  fixed_header: boolean = false;
  user_id: any = "";
  minDate = new Date();
  flightMinDate = new Date();
  flight_Date_back = new Date();
  returnMinDate = new Date();
  maxDate = new Date();
  returnDate = new Date();
  maxReturnDate = new Date();
  bsInlineValue = new Date();
  recent_search: any = {};
  recent_flight_search: any = {};
  user_data: any;
  user_all_data: any;
  location!: Observable<any>;
  success_msg: string = '';
  error_msg: string = '';
  stateList: any = [];
  cities_list: any = [];
  searchLocation: any;
  options = {
    types: [],
    componentRestrictions: { country: 'UA' }
  }
  apiBaseURL: string = ""
  apiassetURL: string = ""
  value!: Date;
  date: any;
  public lat: any;
  public lng: any;
  geoCoder: any;


  childAgeArray: any = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  ChildAge: number = 10;

  constructor(
    public router: Router,
    private apiRequest: ApiService,
    public datepipe: DatePipe,
    private _apiRequest: ApiRequestService,
    public common: CommonService,
    private renderer: Renderer2,
    public http: HttpClient,
    private flightService: FlightService
  ) {
    this.minDate.setDate(this.minDate.getDate());
    this.returnMinDate.setDate(this.minDate.getDate() + 1);
    this.flightMinDate.setDate(this.minDate.getDate() + 1);
    this.flight_Date_back.setDate(this.minDate.getDate() + 2);
    this.maxDate.setDate(this.minDate.getDate() + 90);
    this.returnDate.setDate(this.minDate.getDate() + 1);
    this.maxReturnDate.setDate(this.maxDate.getDate() + 91);
  }
  // @ViewChild('toggleButton') toggleButton!: ElementRef;
  // @ViewChild('menu') menu!: ElementRef;
  // ngAfterViewInit() {
  //   this.renderer.listen('window', 'click', (e: Event) => {
  //     if (this.toggleButton.nativeElement && this.menu.nativeElement) {
  //       if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement) {
  //         this.show_room = false;
  //       }
  //     }
  //   });

  // }

  airPortsList: any = [];


  ngOnInit(): void {

    this.startdateSelect = this.flightMinDate;
    this.ReturnDateSelect = this.flight_Date_back;

    this._apiRequest.getAirPorts().subscribe(
      res => {
        if (res.responseCode) {
        //  console.log("air ports: ", res);
          this.airPortsList = res.data;
        }
      }
    );

    this.apiBaseURL = this.apiRequest.serviceurl;
    this.apiassetURL = this.apiRequest.asseturl;
    this.getPopularHotels();
    this.getPopularCities();
    // this.getLocation();
    this.filterCities();
    // this.geoCoder = new google.maps.Geocoder;  
    // interval(5000).subscribe(_val => this.shuffleItems());
    interval(3500).subscribe(_val => this.shuffleTitle());
    this._apiRequest.getStates().subscribe(res => {
      this.stateList = res.data;
    });
    let reentSerachData = localStorage.getItem("recent_booking")
    if (reentSerachData != null) {
      this.recent_search = JSON.parse(reentSerachData);
    }
    let reentFlightSerachData = localStorage.getItem("flight_booking")
    if (reentFlightSerachData != null) {
      this.recent_search = JSON.parse(reentFlightSerachData);
    }
    this.get_all_cities();

  }

  child_DOB: string = '';
  child_AGE: number = 0;

  getChildDoB(event: any) {
    this.child_DOB = event.target.value;
    this.child_AGE = this.flightService.getAge(this.child_DOB)
   // console.log("Childer date of birth:", this.child_DOB, this.child_AGE)
  }

  infant_AGE: number = 0;

  getInfantDoB(event: any) {
    this.infant_AGE = this.flightService.getAge(event.target.value)
   // console.log("Infant_DOB date of birth:", this.infant_AGE)
  }



  showDepartureAirportModel: boolean = false;
  getDepartureAirportInput(event: any) {
    if (event.target.value.length > 0 && this.departureAirport.length >= 1) {
      this.showDepartureAirportModel = true;
    } else {
      this.showDepartureAirportModel = false;
    }
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

  filterCities() {
    let Obj = {
      lat: this.lat,
      long: this.lng
    }
    this._apiRequest.getFilterCities(Obj).subscribe(
      res => {
        if (res.responseCode == 200) {
          // console.log("Cities List", res);
          this.citiesList = res.data.popular;
        }
      }
    )
  }
  geoArea: string = '';
  geoAddress: string = '';
  geoCity: string = '';
  geoLat: number = 0;
  geoState: string = '';
  selectedLocation: string = '';
  geoLng: number = 0;
  locationoptions = {
    types: [],
    componentRestrictions: { country: 'UA' }
  }
  @ViewChild("placesRef") placesRef!: GooglePlaceDirective;
  public handleAddressChange(address: Address) {
    // Do some stuff
    let cities: any = [];

    //find country name
    for (var i = 0; i < address.address_components.length; i++) {
      for (var b = 0; b < address.address_components[i].types.length; b++) {

        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
        if (address.address_components[i].types[b] == "administrative_area_level_2" || address.address_components[i].types[b] == "locality") {
          //this is the object you are looking for
          //city data
          cities.push(address.address_components[i]);
          break;
        }

      }
    }
  //  console.log("Cities list:", cities[0].short_name);


    this.geoCity = cities[0].short_name;
    this.geoAddress = address.formatted_address;
    this.geoArea = address.name;
    this.geoLat = address.geometry.location.lat();
    this.geoLng = address.geometry.location.lng();
   // console.log("Address", address);

    this.selectedLocation = address.name;
  //  console.log("fdsf", address)

    address.address_components.forEach(address => {
      if (address.types.includes('administrative_area_level_1')) {
    //    console.log("address", address);
        this.geoState = address.long_name;
      }
    });

  }

  // let url = `https://api.bigdatacloud.net/data/reverse-geocode-client`
  getLocation() {
    var map;
    var service;
    var infowindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
     //     console.log("Latitude: ", position);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      },
        (error: any) => { console.log(error) }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // url = url
  //           + "?latitude=" + this.lat
  //           + "&longitude=" + this.lng
  //           + "&localityLanguage=en";
  //         this.getApi(url);
  getApi(url: any) {
    this.http.get<any>(url).subscribe(
      res => {
    //    console.log("Current City", res)
      }
    );
  }
  // getaddress(latitude: any, longitude: any) {
  //   this.geoCoder.geocode({ "location": { lat: latitude, lng: longitude } }, (results:any, status:any) => {
  //     console.log(results);
  //     console.log(status);
  //   });
  // }


  formatDate(date: any) {
    var d = new Date(date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
  }


  searchLoader: boolean = false;
  onSearchHotels(form: NgForm) {
    this.searchLoader = true;
    let data = Object.assign({}, form.value);
    var d = new Date(Date.now())
    // let searchData = {}
    d.setDate(d.getDate() + 1);

    let searchData = {
      hotel_name: data.hotel_name,
      is_searchBy_HotelName: true,
      city: this.geoCity ? this.geoCity : 'Udaipur',
      state: this.geoState ? this.geoState : 'Rajasthan',
      rooms: data.rooms ? data.rooms : 1,
      guestNo: data.guest_no,
      arrival: typeof (data?.date_range[0]) === 'string' ? data.date_range[0] : this.formatDate(data.date_range[0]),
      departure: typeof (data?.date_range[1]) === 'string' ? data.date_range[1] : this.formatDate(data.date_range[1]),
      ...(this.geoLat && { lat: this.geoLat }),
      ...(this.geoLng && { long: this.geoLng }),
    }
    let recentData: any = {
      ...searchData,
      searchLocation: this.geoArea ? this.geoArea : 'Udaipur',
    }
    localStorage.setItem("recent_booking", JSON.stringify(recentData));
    this.router.navigate(['/hotels-search'], { queryParams: searchData });
    this.searchLoader = false;

    // console.log("Search Data", searchData);

  }

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
  //  console.log("flightdata", searchData)
    localStorage.setItem("flight_booking", JSON.stringify(searchData));
    this.router.navigate(['/flights-search'], { queryParams: searchData });
  }
  check_in_date = new Date();
  check_out_date = new Date();
  searchHotelByCities(data: any) {
    let searchData = {
      hotel_name: data.hotel_name,
      is_searchBy_HotelName: true,
      city: this.geoCity ? this.geoCity : 'Udaipur',
      state: this.geoState ? this.geoState : 'Rajasthan',
      rooms: data.rooms ? data.rooms : 1,
      guestNo: data.guest_no,
      arrival: typeof (data?.date_range[0]) === 'string' ? data.date_range[0] : this.formatDate(data.date_range[0]),
      departure: typeof (data?.date_range[1]) === 'string' ? data.date_range[1] : this.formatDate(data.date_range[1]),
      ...(this.geoLat && { lat: this.geoLat }),
      ...(this.geoLng && { long: this.geoLng }),
    }
    let recentData: any = {
      ...searchData,
      searchLocation: this.geoArea ? this.geoArea : 'Udaipur',
    }
    localStorage.setItem("recent_booking", JSON.stringify(recentData));
    this.router.navigate(['/hotels-search'], { queryParams: searchData });
  }
 
  searchBestReach(city: any) {
    let searchData = {
      city: city,
      rooms: this.recent_search.rooms ? this.recent_search.rooms : 1,
      guestNo: this.recent_search.guest_no,
      arrival: this.formatDate(this.check_in_date),
      departure: this.formatDate(this.check_out_date),
      sbpc: true,
      is_searchBy_HotelName: false,
    }
    localStorage.removeItem("hotel_DD");
    localStorage.removeItem("recent_booking");
    localStorage.setItem("city_DD", JSON.stringify(searchData));
    this.router.navigate(['/hotels-search'], { queryParams: searchData });
  }
  // searchBestHotel(searchhotel:any) {
  //   localStorage.removeItem("hotel_DD");
  //   let searchData = {
  //     Hotel_id:searchhotel.id,
  //     Hotel_city: searchhotel.city,
  //     rooms: this.recent_search.rooms ? this.recent_search.rooms : 1,
  //     guestNo: this.recent_search.guest_no,
  //     arrival: this.formatDate(this.check_in_date),
  //     departure: this.formatDate(this.check_out_date),
  //     sbpc: true,
  //     is_searchBy_HotelName: false,
  //   }
  //   localStorage.setItem("hotel_DD", JSON.stringify(searchData));
  // }

  searchHotelByRecentData() {
    let searchData = {
      city: this.recent_search.city,
      rooms: this.recent_search.rooms,
      guestNo: this.recent_search.guest_no,
      arrival: this.recent_search.arrival,
      departure: this.recent_search.departure,
      lat: this.recent_search.lat ? this.recent_search.lat : '',
      long: this.recent_search.long ? this.recent_search.long : '',
    }
    this.router.navigate(['/hotels-search'], { queryParams: searchData });
  }

  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD-MM-YYYY',
    showWeekNumbers: true,
  };

  hometitle = [
    {
      title: "Book Your Accomodation",
      text: "On Price You Desire"
    },
    {
      title: "Reserve a Hotel room",
      text: "At Most Affordable Price Ever"
    },
    {
      title: "Pay Less Get More",
      text: "With Unique Hotel Bid System"
    }
  ];

  shuffleTitle() {
    let counter = this.hometitle.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      [this.hometitle[counter], this.hometitle[index]] = [this.hometitle[index], this.hometitle[counter]];
    }
  }

  userStatus: boolean = false;
  userActive: number = 0;

  user_status(status: any) {
    // let status = event.target.value;
    // console.log("Status", status);
    if (status == true) {
      this.userStatus = false;
    } else if (status == false) {
      this.userStatus = true;
    }
  }

  show_room: boolean = false;
  showAddRoom(event: any) {
    // if(event.target.tagName === 'BODY') {
    //   this.show_room = false;
    // }
    this.show_room = !this.show_room;
    // console.log("room", event)
  }

  TripType: boolean = false;
  showaddTrip(event: any) {
    this.TripType = !this.TripType
  }

  showRemoveRoom(event: any) {
 //   console.log("outside room", event)
  }

  log(event: string) {
    console.log(event)
  }

  show_button_room: boolean = false;
  showButtonAddRoom() {
    this.show_button_room = !this.show_button_room;
  }

  ClickedOut(event: any) {
    //debugger;
    // if (event.target.className === "guestRoomPickerPopUp") {
    //   this.show_room = false;
    // }
    var $target = $(event.target);
    var popupContent = $("guestRoomPickerPopUp");
    if (!$target.is(popupContent) && !$target.is(popupContent)) {
      this.show_room = true;
    }

  }

  public roomsSelector: any[] = [
    {
      id: 1,
      total_guest: 1
    }
  ];

  RoomCount: number = 1;
  GuestCount: number = 1;

  addRoom() {
    if (this.roomsSelector.length < 6) {
      this.roomsSelector.push({
        id: this.roomsSelector.length + 1,
        total_guest: 1
      });
    }
    this.GuestCount = this.roomsSelector.reduce((prev, next) => prev + next.total_guest, 0);
  }

  removeRoom() {
    if (this.roomsSelector.length > 1) {
      this.roomsSelector.pop();
    }
    this.GuestCount = this.roomsSelector.reduce((prev, next) => prev + next.total_guest, 0);
  }

  increaseGuest(i: number) {
    if (this.roomsSelector[i].total_guest < 3) {
      this.roomsSelector[i].total_guest++;
    } else {
      this.roomsSelector[i].total_guest;
    }
    this.GuestCount = this.roomsSelector.reduce((prev, next) => prev + next.total_guest, 0);
  }

  descreseGuest(i: number) {
    if (this.roomsSelector[i].total_guest > 1) {
      this.roomsSelector[i].total_guest--;
    }
    this.GuestCount = this.roomsSelector.reduce((prev, next) => prev + next.total_guest, 0);
  }

  book: string = 'hotel';
  getBookingOption(status: string) {
    this.book = status;
  }

  bottombook: string = 'hotel';
  getBookingOptionBottom(status: string) {
    this.bottombook = status;
  }

  popularOptions: OwlOptions = {
    loop: true,
    margin: 15,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    nav: true,
    responsive: {
      0: {
        items: 2,
        loop: true
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5,
        nav: true,
      },
      1200: {
        items: 6,
      },

    },
  }

  CitiesOptions: OwlOptions = {
    loop: true,
    margin: 15,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    nav: true,
    responsive: {
      0: {
        items: 1.5,
        loop: true
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4,
        nav: true,
      },
      1000: {
        items: 5,
      },
      1440: {
        items: 6,
      },
    },
  }
  shimmerLoad: boolean = true;
  cityshimmerLoad: boolean = true;

  getPopularHotels() {
    this._apiRequest.getPopular().subscribe(res => {
      this.popularHotels = res.data.popular_hotels;
      this.shimmerLoad = false;
     // console.log("popular", this.popularHotels)
    });
  }

  getPopularCities() {
    this._apiRequest.getPopular().subscribe(res => {
      this.popularCities = res.data.popular_cities;
      this.cityshimmerLoad = false;
  //    console.log("Popular Cities list", res);

    });
  }

  showQueryModal: boolean = false;
  successAlert: boolean = false;
  errorAlert: boolean = false;
  bulkEnquiry() {
    this.showQueryModal = !this.showQueryModal;
  }

  onAddQuery(form: NgForm) {
    let data = Object.assign({}, form.value);
    let bulkData = {
      userId: this.user_id,
      email: data.email,
      mobile: data.contact,
      persons: data.persons,
      subject: data.subject,
      content: data.message,
      startdate: this.datepipe.transform(data.bulk_date_range[0], 'dd-MM-yyy'),
      enddate: this.datepipe.transform(data.bulk_date_range[1], 'dd-MM-yyy'),
    }
    this._apiRequest.bulkEnquiry(bulkData).subscribe(
      res => {
        if (res.responseCode == 200) {
          form.reset();
          this.showQueryModal = false;
          // this.common.showAlertBox(res.msg, 'success');
          this.successAlert = true;
          this.success_msg = res.msg;
          setTimeout(() => {
            this.successAlert = false;
          }, 3000);
        } else {
         // console.log("Error", res)
          this.errorAlert = true;
          this.error_msg = res.msg;
          setTimeout(() => {
            this.errorAlert = false;
          }, 6000);
          // this.common.showAlertBox(res.msg, 'error');
        }
      }, err => {
        console.log(err)
      }
    )
  }

  showAddHotelModal: boolean = false;
  addHotel() {
    this.showAddHotelModal = !this.showAddHotelModal;
  }

  onAddHotel(form: NgForm) {
    let data = Object.assign({}, form.value);
    let addhotelData = {
      email: data.email,
      contact: data.contact,
      name: data.name,
      address: data.address,
      state: data.state,
      city: data.city,
      plot_no: data.plot_no,
      landmark: data.landmark,
    }
    this._apiRequest.createHotel(addhotelData).subscribe(
      res => {
        if (res.responseCode == 200) {
          form.reset();
          this.showAddHotelModal = false;
          // this.common.showAlertBox(res.msg, 'success');
          this.common.successAlert = true;
          this.common.success_msg = res.msg;
          setTimeout(() => {
            this.common.successAlert = false;
          }, 3000);
        } else {
          // this.common.showAlertBox(res.msg, 'error');
          this.common.errorAlert = true;
          this.common.error_msg = res.msg;
          setTimeout(() => {
            this.common.errorAlert = false;
          }, 6000);
        }
      }, err => {
        console.log(err)
      }
    )
  }

  getStateCode(event: any) {
    let stateCode = event.target.value;
    let state_code = "";
    this.stateList.forEach((value: any) => {
      if (value.name == stateCode) {
        state_code = value.code;
      }
    });
    this._apiRequest.getCities().subscribe(res => {
      this.cities_list = res.data[state_code];
    })
  }

  showAddAgentModal: boolean = false;
  addTravelAgent() {
    this.showAddAgentModal = !this.showAddAgentModal;
  }

  onAddTravelAgent(form: NgForm) {
    let data = Object.assign({}, form.value);
    let addtravelagentData = {
      agent_name: data.agent_name,
      email: data.email,
      contact_no: data.contact,
      address: data.address,
      state: data.state,
      city: data.city,
      company_name: data.company,
      country: 'India',
      zip: data.zip,
      area: data.area
    }
    this._apiRequest.createTravel(addtravelagentData).subscribe(
      res => {
        if (res.responseCode == 200) {
          form.reset();
          this.showAddAgentModal = false;
          this.successAlert = true;
          this.success_msg = res.msg;
          setTimeout(() => {
            this.successAlert = false;
          }, 3000);
        } else {
          // console.log("Error", res)
          this.errorAlert = true;
          this.error_msg = res.msg;
          setTimeout(() => {
            this.errorAlert = false;
          }, 6000);
          // this.common.showAlertBox(res.msg, 'error');
        }
      }, err => {
        console.log(err)
      }
    )
  }

  shuffleActive: boolean = false;
  shuffleItems() {
    // let counter = this.gridImage.length;

    // while (counter > 0) {
    //   let index = Math.floor(Math.random() * counter);
    //   counter--;
    //   [this.gridImage[counter], this.gridImage[index]] = [this.gridImage[index], this.gridImage[counter]];
    // }  

    const length = this.gridImage == null ? 0 : this.gridImage.length
    let index = -1
    const lastIndex = length - 1
    const result = [...this.gridImage];
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
      const value = result[rand]
      result[rand] = result[index]
      result[index] = value
    }
    this.shuffleActive = true;
    this.gridImage = result;
  }

  gridImage = [
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/1.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/2.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/3.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/4.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/5.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/6.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/7.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/8.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/9.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/10.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/11.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/12.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/13.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/14.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/15.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/16.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/17.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/18.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/19.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/20.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/21.jpg"
    },
    {
      src: "https://storage.googleapis.com/jusbid_cloud_storage/assets/images/header-img/22.jpg"
    },
  ];

  onHotelDetails(city: string) {
    this._apiRequest.setHotelBooking(city);
  }

  allState_Cities: any = [];
  get_all_cities() {
    this._apiRequest.getCities().subscribe(
      res => {
        let keys = {
          keys: Object.keys(res.data),
          values: ''
        };
        keys.keys.forEach((key) => {
          let a = {
            state: key,
            cities: res.data[key]
          }
          this.allState_Cities.push(a);
        });
        // console.log(this.allState_Cities);
      }
    );
  }

  footerList = [
    {
      header: "Product Offerings",
      list: [
        {
          name: "Hotels",
          function: () => { },
          link: ""
        },
        {
          name: "Flights",
          function: () => { },
          link: ""
        },
        // {
        //   name: "Holiday Packages",
        //   function: () => { },
        //   link: ""
        // },
        // {
        //   name: "Events",
        //   function: () => { },
        //   link: ""
        // },
        {
          name: "Jusbid for Corporates",
          function: () => { },
          link: ""
        },
        {
          name: "Jusbid for Travel agencies",
          function: () => { },
          link: ""
        },
        {
          name: "Jusbid for Hoteliers",
          function: () => { },
          link: ""
        },
      ]
    },
    {
      header: "JUSBID",
      list: [
        // {
        //   name: "Hotels",
        //   function: () => { },
        //   link: ""
        // },
        {
          name: "About Us",
          function: () => { },
          link: ""
        },
        // {
        //   name: "Investor Relations",
        //   function: () => { },
        //   link: ""
        // },
        {
          name: "Testimonials",
          function: () => { },
          link: ""
        },
        // {
        //   name: "Reviews",
        //   function: () => { },
        //   link: ""
        // },
        {
          name: "Careers",
          function: () => { },
          link: ""
        },
        {
          name: "Travel Blog/Guide/Trip Planner",
          function: () => { },
          link: ""
        },
        {
          name: "Deals/Offers",
          function: () => { },
          link: ""
        },
        // {
        //   name: "Gift Vouchers/Coupons",
        //   function: () => { },
        //   link: ""
        // },
        // {
        //   name: "My trip essentials",
        //   function: () => { },
        //   link: "https://www.jusbid.in/others/Trip.html"
        // },
        // {
        //   name: "Trip Planner",
        //   function: () => { },
        //   link: ""
        // },
      ]
    },
    {
      header: "ABOUT THE SITE",
      list: [
        {
          name: "Contact Us",
          function: () => { },
          link: ""
        },
        {
          name: "Payment Security",
          function: () => { },
          link: ""
        },
        {
          name: "Privacy policy",
          function: () => { },
          link: "https://www.jusbid.in/others/privacy-policy.html"
        },
        {
          name: "User Agreement",
          function: () => { },
          link: "https://www.jusbid.in/others/faq.html"
        },
        {
          name: "Terms of Service",
          function: () => { },
          link: "https://www.jusbid.in/others/terms-condition.html"
        },
        // {
        //   name: "Make a Payment",
        //   function: () => { },
        //   link: ""
        // },
        {
          name: "CSR Policy",
          function: () => { },
          link: ""
        },
        {
          name: "Refund/Reissue",
          function: () => { },
          link: ""
        },
        {
          name: "FAQ ",
          function: () => { },
          link: ""
        },
        // {
        //   name: "Report a defect/Jusbid bug bounty",
        //   function: () => { },
        //   link: ""
        // },
      ]
    },
    {
      header: "Become a Partner Program",
      list: [
        {
          name: "List your Hotels",
          function: () => {
            this.addHotel()
          },
          link: ""
        },
        {
          name: "Login To Portal",
          function: () => { },
          link: "https://www.jusbid.in/dev/portal/partner/hotelier",
        },
        {
          name: "Become a Travel Agent",
          function: () => {
            this.addTravelAgent()
          },
          link: ""
        },
      ]
    },
    // {
    //   header: "Important Links",
    //   list: [
    //     {
    //       name: "Travel Insurance",
    //       function: () => { },
    //       link: "",
    //     },
    //     {
    //       name: "Foreign Exchange",
    //       function: () => { },
    //       link: "",
    //     },
    //     {
    //       name: "Domestic Airlines",
    //       function: () => { },
    //       link: ""
    //     },
    //     {
    //       name: "International Airlines",
    //       function: () => { },
    //       link: ""
    //     },
    //     {
    //       name: "Flight Status",
    //       function: () => { },
    //       link: ""
    //     },

    //   ]
    // },
  ];


  selectTravellers() {

  }

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
  //  console.log("data", this.childrens);
  //  console.log("data", this.infants);
  }

}
