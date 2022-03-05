import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-best-reach-section',
  templateUrl: './best-reach-section.component.html',
  styleUrls: ['./best-reach-section.component.scss']
})
export class BestReachSectionComponent implements OnInit {
  popularCities: any = [];
  recent_search: any = {};
  apiBaseURL: string = ""
  apiRequest: any;

  constructor(
    private _apiRequest: ApiRequestService,
    public router: Router,

  ) { }

  ngOnInit(): void {
    this.apiBaseURL = this._apiRequest.base_api_URL;
    this.getPopularCities();
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

  getPopularCities() {
    this._apiRequest.getPopular().subscribe(res => {
      this.popularCities = res.data.popular_cities;
      this.shimmerLoad = false;
     // console.log("Popular Cities list", res);

    });
  }

  formatDate(date: any) {
    var d = new Date(date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
  }
  check_in_date = new Date();
  check_out_date = new Date();

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
}
