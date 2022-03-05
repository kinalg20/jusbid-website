import { Component, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CommonService } from '../../modules/core/services/common.service';
import { SEOService } from '../../modules/core/services/seo.service';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';





@Component({
  selector: 'app-newfront',
  templateUrl: './newfront.component.html',
  styleUrls: ['./newfront.component.scss']
})


export class NewfrontComponent implements OnInit {

  value : any;
  dateRange : any;
  fromDate = new Date();
  toDate = new Date(); 
  invalidDates: Array<Date> = [];

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

  beloved_city = [
    {
      img_url: "assets/images/Udaipur.jpg",
      city_name: "Udaipur"
    },
    {
      img_url: "assets/images/jaipur.jpg",
      city_name: "Jaipur"
    },
    {
      img_url: "assets/images/Amritsar.jpg",
      city_name: "Amritsar"
    },
    {
      img_url: "assets/images/Bangluru.jpg",
      city_name: "Bengaluru"
    },
    {
      img_url: "assets/images/kolkata.jpg",
      city_name: "Kolkata"
    }
  ];


  isShow_SingleBlog: boolean = false;
  blogPost: any;
  today_date = new Date();


  constructor(public sco_api: SEOService,
    public common: CommonService, 
    public datepipe : DatePipe,
    public router : Router) {
    this.getPost();
    this.fromDate.setDate(this.today_date.getDate() );
    this.toDate.setDate(this.today_date.getDate() + 1);
  }


  ngOnInit(): void {
    interval(3500).subscribe(_val => this.shuffleTitle());
    interval(6000).subscribe(_val1 => this.shufflecity());
    this.value = [
    this.fromDate,
    this.toDate
    ]

  }



  shuffleTitle() {
    let counter = this.hometitle.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      [this.hometitle[counter], this.hometitle[index]] = [this.hometitle[index], this.hometitle[counter]];
    }
  }
  shufflecity() {
    let counter = this.beloved_city.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      [this.beloved_city[counter], this.beloved_city[index]] = [this.beloved_city[index], this.beloved_city[counter]];
    }
  }

  getPost() {
    this.common.is_app_loading = true;
    this.sco_api.getSeoData().subscribe(res => {
      this.common.is_app_loading = false;
      this.blogPost = res;
      // console.log("blog_data", this.blogPost);
    });
  }
  sortDesc(text: any, len: number) {
    let moreSign: string = '...';
    if (text.length > len) {
      return text.slice(0, len) + '...';
    } else {
      return text.slice(0, text.length);
    }
  }

  iframeLink: string = ''
  show_SingleBlog(link: string) {
    console.log(link);
    this.common.is_app_loading = true;
    this.isShow_SingleBlog = !this.isShow_SingleBlog;
    this.iframeLink = link;
    this.common.is_app_loading = false;
  }


  is_showTraveller: boolean = false;
  showTraveller() {
    this.is_showTraveller = !this.is_showTraveller
  }




  geoArea: string = '';
  geoState: string = '';
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
    console.log("Cities list:", cities[0].short_name);
    this.geoCity = cities[0].short_name;
    this.geoAddress = address.formatted_address;
    this.geoArea = address.name;
    this.geoLat = address.geometry.location.lat();
    this.geoLng = address.geometry.location.lng();
    console.log("Address = ", this.geoAddress + " " + this.geoLat + " " + this.geoLng);
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



//for pick date range
validateDateRange(event : any) {
  this.dateRange = this.value;
   console.log("date ", this.dateRange ) ;

}


formatDate(date: any) {
  var d = new Date(date);
  return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
}


  //Serach Hotel 
  onSearchHotels(form: NgForm) {
    let data = Object.assign({}, form.value);
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
    console.log("data", data)
    localStorage.setItem("recent_booking", JSON.stringify(recentData));
    this.router.navigate(['/hotels-search'], { queryParams: searchData });
  }
  



  searchBestReach(city: any) {
    let searchData = {
      city: city,
      rooms: 1,
      guestNo: 1,
      arrival: this.formatDate(this.fromDate),
      departure: this.formatDate(this.toDate),
      sbpc: true,
      is_searchBy_HotelName: false,
    }
    localStorage.setItem("Hotel_city", JSON.stringify(searchData));
    this.router.navigate(['/hotels-search'], { queryParams: searchData });
  }
  }




 





