import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'popular-cities-section',
  templateUrl: './popular-cities-section.component.html',
  styleUrls: ['./popular-cities-section.component.scss']
})
export class PopularCitiesSectionComponent implements OnInit {
  citiesList: any = [];
  public lat: any;
  public lng: any;
  apiBaseURL: string = "";
  assets_URL: string = "";
  apiRequest: any;
  constructor(
    private _apiRequest: ApiRequestService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    // this.apiBaseURL = this._apiRequest.serviceurl;
    this.apiBaseURL = this._apiRequest.base_api_URL;
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
  check_in_date = new Date();
  check_out_date = new Date();

  searchBestReach(city: any) {
    let searchData = {
      city: city,
      rooms: 1,
      guestNo: 1,
      arrival: this.formatDate(this.check_in_date),
      departure: this.formatDate(this.check_out_date),
      sbpc: true,
      is_searchBy_HotelName: false,
    }
    localStorage.setItem("city_DD", JSON.stringify(searchData));
    this.router.navigate(['/hotels-search'], { queryParams: searchData });
  }

  formatDate(date: any) {
    var d = new Date(date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
  }

}


