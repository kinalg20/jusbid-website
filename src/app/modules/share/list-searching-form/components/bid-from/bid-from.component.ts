import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { CommonService } from 'src/app/modules/core/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'bid-from',
  templateUrl: './bid-from.component.html',
  styleUrls: ['./bid-from.component.scss']
})
export class BidFromComponent implements OnInit {
  fixed_header: boolean = false;
  
  today_date = new Date();
  check_in_date = new Date();
  check_out_date = new Date();
  bsRangeValue: any;
  constructor( public common: CommonService,
    public datepipe: DatePipe,
    private _apiRequest: ApiRequestService,
    public _common :CommonService) {
      this.check_in_date.setDate(this.today_date.getDate());
      this.check_out_date.setDate(this.today_date.getDate() + 1);
     }
     min_Date:any;
     return_Date : any;
     recent_search: any = {};

     bsConfig: any = {
      isAnimated: true,
      rangeInputFormat: 'DD/MM/YYYY',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY '
    };
    formatDate(date: any) {
      var d = new Date(date);
      return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear() ;
    }
  ngOnInit(): void {

    let recentSearchData = localStorage.getItem("recent_booking")
      if (recentSearchData != null) {
      this.recent_search = JSON.parse(recentSearchData);
      if (this.recent_search.arrival && this.recent_search.departure) {
        this.bsRangeValue = [this.recent_search.arrival, this.recent_search.departure];
      } else {
        this.bsRangeValue = [this.formatDate(this.check_in_date), this.formatDate(this.check_out_date)];
      }
    } else {
      this.bsRangeValue = [this.formatDate(this.check_in_date), this.formatDate(this.check_out_date)];
    }
    this.bsRangeValue = [
      this.formatDate(this.check_in_date),
      this.formatDate(this.check_out_date)
    ];
  }
 
  geoArea: string = '';
  geoAddress: string = '';
  geoCity: string = '';
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
  //  console.log("Cities list:", cities[0].short_name);
    this.geoCity = cities[0].short_name;
    this.geoAddress = address.formatted_address;
    this.geoArea = address.name;
    this.geoLat = address.geometry.location.lat();
    this.geoLng = address.geometry.location.lng();
//    console.log("Address", address);
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
  public roomsSelector: any[] = [
    {
      id: 1,
    
    }
  ];
  addRoom() {
    if (this.roomsSelector.length < 6) {
      this.roomsSelector.push({
        id: this.roomsSelector.length + 1,
     
      });
    }
   
  }

  removeRoom() {
    if (this.roomsSelector.length > 1) {
      this.roomsSelector.pop();
    }
  }
  show_room: boolean = false;
  showAddRoom(event: any) {
    this.show_room = !this.show_room;
  }
  success_msg: boolean = false;
  errorAlert: boolean = false;
  error_msg : string = '';
  searchLoader:boolean = false;
  onSubmitBidFrom(form: NgForm) {
    let data = Object.assign({}, form.value);
    var d = new Date(Date.now())
    d.setDate(d.getDate() + 1)
    let params = {
      userId: this.common.getLogedinUserData().userId,
      location: this.geoArea + ' ' + this.geoAddress,
      checkin: typeof (data?.date_range[0]) === 'string' ? data.date_range[0] : this.formatDate(data.date_range[0]),
      checkout:typeof (data?.date_range[1]) === 'string' ? data.date_range[1] : this.formatDate(data.date_range[1]),
      rooms: data.room_count,
      min_budget: data.min_budget,
      max_budget: data.max_budget,
      prefered_hotel: data.prefered_hotel,
      lat: this.geoLat,
      long: this.geoLng,

    }
  //  console.log("dd",params);
    this._apiRequest.getBidFrom(params).subscribe(
      res => {
        if (res.responseCode == 200) {
          Swal.fire({
            html: '<p>' + res.msg + '</p>',
            icon: 'success',
            showConfirmButton:false,
            timer:3000
          })

          form.reset();
   //       console.log("res", res);
          this.searchLoader = false;
        }
        else {
          Swal.fire({
            html: '<p>' + res.msg + '</p>',
            icon: 'error',
            showConfirmButton:false,
            timer:3000
          })
          this.common.showAlertBox(res.msg, "error")
          this.error_msg = res.msg;
          //  this.common.showAlertBox(res.msg, "error");
        }
      }, err => {
        this.error_msg = '',
        console.log(err)
      }
    )
  }


  max_RoomCount: number = 6;
  roomCount: number = 1;
  increaseRoomCount() {
    if (this.roomCount >= this.max_RoomCount) {
      this.roomCount = this.max_RoomCount;
    } else {
      this.roomCount++;
    }
  }
  descreseRoomCount() {
    if (this.roomCount == 0) {
      this.roomCount = 0;
    } else {
      this.roomCount--;
    }
  }
}
