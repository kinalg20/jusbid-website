import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'hotel-search-form',
  templateUrl: './hotel-search-form.component.html',
  styleUrls: ['./hotel-search-form.component.scss']
})
export class HotelSearchFormComponent implements OnInit {


  today_date = new Date();
  check_in_date = new Date();
  check_out_date = new Date();
  maxDate = new Date();
  constructor(private router: Router, private datepipe: DatePipe) {
    this.check_in_date.setDate(this.today_date.getDate());
    this.check_out_date.setDate(this.today_date.getDate() + 1);
    //this.maxDate.setDate(this.check_in_date.getDate() + 90);
  }

  checkindate: any;
  checkoutdate: any; 
  bsRangeValue: any;
  recent_search: any = {};

  bsConfig: any = {
    isAnimated: true,
    rangeInputFormat: 'DD/MM/YYYY',
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY'
  };

  ngOnInit(): void {
    let recentSearchData = localStorage.getItem("recent_booking");
    // if (recentSearchData != null) {
    //   this.recent_search = JSON.parse(recentSearchData);
    //   if (this.recent_search.arrival && this.recent_search.departure) {
    //     this.bsRangeValue = [this.recent_search.arrival, this.recent_search.departure];
    //   } else {
    //     this.bsRangeValue = [this.formatDate(this.check_in_date), this.formatDate(this.check_out_date)];
    //   }
    // } else {
    //   this.bsRangeValue = [this.formatDate(this.check_in_date), this.formatDate(this.check_out_date)];
    // }

    if (recentSearchData !== null) {
      this.recent_search = JSON.parse(recentSearchData);
    }

    // always show today's date on landing page

    this.bsRangeValue = [
      this.formatDate(this.check_in_date),
      this.formatDate(this.check_out_date)
    ];

  }

  // select first entry from autocomplete dropdown

  selectFirstEntry(searchInput: any) {
    searchInput.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      keyCode: 40,
    }));

    searchInput.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
    })) 
  }
  //


  getDateFormated(date: any) {
    let d: any;
    if (date instanceof Date) {
      var month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][date.getMonth()];
      d = ("0" + date.getDate()).slice(-2) + ' ' + month.slice(0, 3) + ' ' + date.getFullYear();
    } else {
      let newDate: any = new Date(date);
      var month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][date.split('-')[1]];
      d = ("0" + newDate.getDate()).slice(-2) + ' ' + month.slice(0, 3) + ' ' + newDate.getFullYear();
    }
    return d;
  }

  geoArea: string = '';
  geoAddress: string = '';
  geoCity: string = '';
  geoState: string = '';
  geoLat: number = 0;
  geoLng: number = 0;
  locationoptions = {
    types: [],
    componentRestrictions: { country: 'UA' }
  }

  selectedLocation: string = '';

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
  //  console.log("fdsf", address)

    address.address_components.forEach(address => {
      if (address.types.includes('administrative_area_level_1')) {
        if (!this.geoCity) {
          this.geoCity = address.long_name;
        }
        
        this.geoState = address.long_name;
      }
    });

  }

  formatDate(date: any) {
    var d = new Date(date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
  }

  hotelname: string = '';

  onSearchHotels(form: NgForm) {
    let data = Object.assign({}, form.value);
    if (this.location_type == 'Hotel') {
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
    } else {
      let searchData = {
        city: this.geoCity ? this.geoCity : 'Udaipur',
        state: this.geoState ? this.geoState : 'Rajasthan',
        rooms: data.rooms ? data.rooms : 1,
        guestNo: data.guest_no,
        arrival: typeof (data?.date_range[0]) === 'string' ? data.date_range[0] : this.formatDate(data.date_range[0]),
        departure: typeof (data?.date_range[1]) === 'string' ? data.date_range[1] : this.formatDate(data.date_range[1]),
        ...(this.geoLat && { lat: this.geoLat }),
        ...(this.geoLng && { long: this.geoLng }),
      };
      let recentData: any = {
        ...searchData,
        searchLocation: this.geoArea ? this.geoArea : 'Udaipur',
      };
      localStorage.setItem("recent_booking", JSON.stringify(recentData));
      this.router.navigate(['/hotels-search'], { queryParams: searchData });
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



  // Manage Rooms
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

  // Manage Travellers
  adultCount: number = 1;
  childCount: number = 0;
  infantCount: number = 0;
  totaltravellersCount: number = 1;

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


  onSearchOption(event: any) {
    this.is_show_options = !this.is_show_options
  }

  is_show_options: boolean = false;
  showOptions() {
    //  this.is_show_options = !this.is_show_options;
    this.is_show_options = false;
  }
  location_type: string = 'City'
  setCityType(type: string) {
    this.location_type = type;

    this.is_show_options = true;

  }
}