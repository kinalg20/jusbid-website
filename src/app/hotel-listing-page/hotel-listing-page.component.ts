import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../core/services/api-requests.service';
import { UtilsService } from '../core/services/utils.service';

@Component({
  selector: 'app-hotel-listing-page',
  templateUrl: './hotel-listing-page.component.html',
  styleUrls: ['./hotel-listing-page.component.scss']
})
export class HotelListingPageComponent implements OnInit {

  constructor(private _apiReqService: ApiRequestService, public _utilService: UtilsService) { }

  ngOnInit(): void {
    this.getAmenitiesList();
    this.getCategoriesList();

    this._utilService.getGeoLocation(24.6014809, 73.687874)
  }


  getAmenitiesList() {
    this._apiReqService.GetAllAmenities().subscribe(
      res => {
        console.log("All Amenities:", res);
      }
    );
  }

  getCategoriesList() {
    this._apiReqService.GetHotelCategories().subscribe(
      res => {
        console.log("Hotel Categories:", res);
      }
    );
  }

}
