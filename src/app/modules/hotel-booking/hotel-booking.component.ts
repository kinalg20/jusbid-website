import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { CommonService } from '../core/services/common.service';

@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.scss']
})
export class HotelBookingComponent implements OnInit {

  constructor(
    private _api: ApiService,
    public common : CommonService
  ) { }

  ngOnInit(): void {
    
  }

}
