import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from '../../core/services/api-requests.service';
import { CommonService } from '../../core/services/common.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainFooterComponent implements OnInit {

  minDate = new Date();
  citiesList: any = [];
  footerList = [
    {
      header: "Product Offerings",
      list: [
        {
          name: "Flight",
          // function: () => { },
          link: "/flights-search/flightSoon",
          is_cutom_link: false
        },
        {
          name: "Best Hotel Room Deals",
          // function: () => { },
          link: "/Best-hotel-room-deals",
          is_cutom_link: false
        },
        // {
        //   name: "Flights",
        //   // function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
        // {
        //   name: "Holiday Packages",
        //   // function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
        // {
        //   name: "Events",
        //   // function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
        // {
        //   name: "Jusbid for Corporates",
        //   // function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
        // {
        //   name: "JusBid for Travel Agencies",
        //   // function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
        // {
        //   name: "JusBid for Hoteliers",
        //   // function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
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
        // {
        //   name: "About Us",
        //   function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
        // {
        //   name: "Investor Relations",
        //   function: () => { },
        //   link: ""
        // },
        // {
        //   name: "Testimonials",
        //   function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
        // {
        //   name: "Reviews",
        //   function: () => { },
        //   link: ""
        // },
        {
          name: "Careers",
          function: () => { },
          link: "/career",
          is_cutom_link: false
        },
        {
          name: "JusBid Blog",
          function: () => { },
          link: "/blogs",
          is_cutom_link: false
        },
        // {
        //   name: "Guide",
        //   function: () => { },
        //   link: "/guide",
        //   is_cutom_link: false
        // },
        // {
        //   name: "Deals/Offers",
        //   function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
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
          link: "/contact-us",
          is_cutom_link: false
        },
        {
          name: "Payment Security",
          function: () => { },
          link: "/Payment-security",
          is_cutom_link: false
        },
        {
          name: "Privacy Policy",
          function: () => { },
          link: "/privacy-policy",
          is_cutom_link: false
        },
        {
          name: "User Agreement",
          function: () => { },
          link: "/user-agreement",
          is_cutom_link: false
        },
        {
          name: "Terms and Conditions",
          function: () => { },
          link: "/terms-and-condition",
          is_cutom_link: false
        },
        // {
        //   name: "Make a Payment",
        //   function: () => { },
        //   link: ""
        // },
        // {
        //   name: "CSR Policy",
        //   function: () => { },
        //   link: "",
        //   is_cutom_link: false
        // },
        {
          name: "Travel Agent Agreement",
          function: () => { },
          link: "/travel-agent-agreement",
          is_cutom_link: false
        },
        {
          name: "FAQ'S",
          function: () => { },
          link: "/faqs",
          is_cutom_link: false
        },
        // {
        //   name: "Report a defect/Jusbid bug bounty",
        //   function: () => { },
        //   link: ""
        // },
      ]
    },
    {
      header: "Become a Partner ",
      list: [
        {
          name: "List your Hotels",
          // function: () => {
          //   this.addHotel()
          // },
          link: "/register-your-hotel",
          is_cutom_link: false
        },
        // {
        //   name: "Login To Portal",
        //   function: () => { },
        //   link: "https://www.jusbid.in/portal/partner/hotelier",
        //   is_cutom_link: true
        // },
        {
          name: "Become a Travel Agent",
          // function: () => {
          //   this.addTravelAgent()
          // },
          link: "/become-travel-agent",
          is_cutom_link: false
        },
        {
          name: "Business Partner Agreement",

          link: "/business-partner-agreement",
          is_cutom_link: false
        },
      ]
    },
    


  ];
  popularCities: any = [];
  cityshimmerLoad: boolean = true;
  recent_search: any = {};
  check_in_date = new Date();
  check_out_date = new Date();
  public lat: any;
  public lng: any;
  constructor(
    public _common: CommonService,
    public _apiRequest: ApiRequestService,
    public router: Router,
    private apiRequest: ApiService,
  ) { }
  appURL: string = "https://www.jusbid.in";
  getPopularCities() {
    this._apiRequest.getPopular().subscribe(res => {
      this.popularCities = res.data.popular_cities;
      this.cityshimmerLoad = false;
     // console.log("Popular City 8989", this.popularCities);

    });
  }

  formatDate(date: any) {
    var d = new Date(date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
  }
  ngOnInit(): void {
    this.apiBaseURL = this.apiRequest.serviceurl;
    this.getPopularCities();
    this.filterCities();
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

  shimmerLoad: boolean = true;
  apiBaseURL: string = "";

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
    this.go_to_Top()
    localStorage.removeItem("recent_booking");
    this.router.navigate(['/hotels-search'], { queryParams: searchData });
  }

  go_to_Top() {
    window.scroll(0, 0);
  }
}
