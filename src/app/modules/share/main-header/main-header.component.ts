import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiRequestService } from '../../core/services/api-requests.service';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Input() header: string = '';
  main_header: boolean = false;
  minDate = new Date();
  maxDate = new Date();
  returnDate = new Date();
  // searchQuery: any;
  recent_search: any = {};
  RoomCount: number = 1;
  GuestCount: number = 1;
  searchQuery: any;
  recent_search_state: any;
  currentUserData: any = {};
  recent_state:any;

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
  roomCount: number = 1;

  today_date = new Date();
  check_in_date = new Date();
  check_out_date = new Date();

  checkindate: any;
  checkoutdate: any;
  bsRangeValue: any;
  recent_search_key: string = '';

  constructor(
    public router: Router,
    public datepipe: DatePipe,
    public _common: CommonService,
    private _apiRequestService: ApiRequestService,
    private route: ActivatedRoute,
    public renderer: Renderer2
  ) {
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 90);
    this.returnDate.setDate(this.minDate.getDate() + 1);

    this.check_in_date.setDate(this.today_date.getDate());
    this.check_out_date.setDate(this.check_in_date.getDate() + 1);
  }
  city_data: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params;
      console.log(this.searchQuery);
    });
    this.recent_search_key = this.searchQuery.city;

    const hotelId = this.route.snapshot.params.id;
    if (hotelId) {
      this._apiRequestService.get_hotel_by_hotelId(hotelId).subscribe(
        res => { this.recent_search_key = res.data.city }
      );
    }

    // console.log("FEtching data")
    if (this.header == 'main') { this.main_header = true; }
    let recentSearchData = localStorage.getItem("recent_booking")
    if (recentSearchData != null) {
      this.recent_search = JSON.parse(recentSearchData);
      this.roomCount = this.recent_search.rooms;
      // this.recent_search_key = this.recent_search.is_searchBy_HotelName ? this.recent_search.hotel_name : this.recent_search.searchLocation;
      //  console.log("recent_search", this.recent_search)

      this.GuestCount = this.recent_search.guestNo;
      this.bsRangeValue = [this.recent_search.arrival, this.recent_search.departure];

      if (this.recent_search.sbpc || recentSearchData == null) {

        this.bsRangeValue = [this.formatDate(this.check_in_date), this.formatDate(this.check_out_date)];

        this.recent_search_key = this.recent_search.city ? this.recent_search.city : ''

        this.recent_search_state = this.recent_search.state ? this.recent_search.state : ''
      }
    }

    else {
      this.bsRangeValue = [this.formatDate(this.check_in_date), this.formatDate(this.check_out_date)];
      this.recent_search.city = this.recent_search_key;
      this.recent_search.arrival = this.formatDate(this.check_in_date);
      this.recent_search.departure = this.formatDate(this.check_out_date);
      this.recent_search.rooms = this.roomCount;
    }

    this._apiRequestService.getUserInformationsByUid(this._common.getLogedinUserData().userId).subscribe(
      res => {
        if (res.responseCode === 200) {
          this.currentUserData = res.data;
        }
      }
    );

    if (
      typeof this.recent_search.arrival === 'string' &&
      typeof this.recent_search.departure === 'string'
    ) {
      this.recent_search.arrival = stringToDate(this.recent_search.arrival);
      this.recent_search.departure = stringToDate(this.recent_search.departure);
    }

  }

  formatDate(date: any) {
    var d = new Date(date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
  }

  // convertDate(date: any) {
  //   var parts = date.split('-');
  //   let day = parts[0];
  //   let month = parts[1];
  //   let year = parts[2];
  //   return new Date(year, month, day);
  // }

  geoCity: string = '';
  geoAddress: string = '';
  geoArea: string = '';
  selectedLocation: string = '';
  geoState: string = '';
  geoLat: number = 0;
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

    this.geoCity = cities[0]?.short_name;
    this.geoAddress = address.formatted_address;
    this.geoArea = address.name;
    this.geoLat = address.geometry.location.lat();
    this.geoLng = address.geometry.location.lng();
    this.selectedLocation = address.name;

    address.address_components.forEach(address => {
      if (address.types.includes('administrative_area_level_1')) {
        if (!this.geoCity) {
          this.geoCity = address.long_name;
        }

        this.geoState = address.long_name;
      }
    });

  }


  show_header_room: boolean = false;
  showAddRoom() {
    this.show_header_room = !this.show_header_room;
  }
  show_button_room: boolean = false;
  showButtonAddRoom() {
    this.show_button_room = !this.show_button_room;
  }
  public roomsSelector: any[] = [
    {
      id: 1,
      total_guest: 1
    }
  ];

  addRoom() {
    if (this.roomsSelector.length < 6) {
      this.roomsSelector.push({
        id: this.roomsSelector.length + 1,
        total_guest: 1
      });
    }
    this.GuestCount = this.roomsSelector.reduce((prev, next) => prev + next.total_guest, 0);
    this.roomCount = this.roomsSelector.length;
  }

  removeRoom() {
    if (this.roomsSelector.length > 1) {
      this.roomsSelector.pop();
    }
    this.GuestCount = this.roomsSelector.reduce((prev, next) => prev + next.total_guest, 0);
    this.roomCount = this.roomsSelector.length;
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
  onSearchHotels(form: NgForm) {
    let data = Object.assign({}, form.value);
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
    this.city_data = localStorage.getItem("recent_booking");
    this.city_data = JSON.parse(this.city_data);
    this.recent_search_key = this.city_data.city;
    this.recent_search.city = this.city_data.city;
    this.recent_search_state =this.city_data.state;
    this.responsiveSearch = false;
  }

  logout() {
    this._common.logOut();
  }

  responsiveSearch: boolean = false;
  showSearch() {
    this.responsiveSearch = !this.responsiveSearch;
  }

  hideSearch() {
    this.responsiveSearch = false;
  }


  back() {
    window.history.back()
  }

  getShortUserName(fname: string, lname: string) {
    return fname?.slice(0, 1) + ' ' + lname?.slice(0, 1);
  }


  // buttonclick(){

  // }

  // manually filling `recent_search` when localStorage.getItem('recent_booking') object isn't available


  //
}
function stringToDate(s: string) {
  const d = new Date(s.split('-').reverse().join('-'));

  return d;
}


