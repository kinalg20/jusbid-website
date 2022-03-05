import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/modules/core/services/common.service';

@Component({
  selector: 'popular-hotels-section',
  templateUrl: './popular-hotels-section.component.html',
  styleUrls: ['./popular-hotels-section.component.scss']
})
export class PopularHotelsSectionComponent implements OnInit {

  popularHotels: any = [];
  apiBaseURL:string = "";
  constructor(
    private _apiRequest: ApiRequestService,
    public common: CommonService

  ) { }

  ngOnInit(): void {
    this.getPopularHotels();
    this.apiBaseURL = this._apiRequest.base_api_URL;
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

  shimmerLoad: boolean = true;
  cityshimmerLoad: boolean = true;

  getPopularHotels() {
    this._apiRequest.getPopular().subscribe(res => {
      this.popularHotels = res.data.popular_hotels;
      this.shimmerLoad = false;
    //  console.log("popular", this.popularHotels)
    });
  }
}
