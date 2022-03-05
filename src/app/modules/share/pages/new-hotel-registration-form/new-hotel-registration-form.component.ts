import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { CommonService } from 'src/app/modules/core/services/common.service';

@Component({
  selector: 'app-new-hotel-registration-form',
  templateUrl: './new-hotel-registration-form.component.html',
  styleUrls: ['./new-hotel-registration-form.component.scss']
})
export class NewHotelRegistrationFormComponent implements OnInit {


  stateList: any = [];
  cities_list: any = [];
  success_mgs: string = '';

  constructor(private _apiRequest: ApiRequestService, private common: CommonService) { }

  ngOnInit(): void {

    this._apiRequest.getStates().subscribe(res => {
      this.stateList = res.data;
    });

  }

  onAddHotel(form: NgForm) {
    let data = Object.assign({}, form.value);
    let addhotelData = {
      email: data.email,
      contact: data.contact,
      name: data.name,
      address: data.address,
      state: data.state,
      city: data.city,
      plot_no: data.plot_no,
      landmark: data.landmark,
    }
    this._apiRequest.createHotel(addhotelData).subscribe(
      res => {
        if (res.responseCode == 200) {
          this.success_mgs = res.msg;
          setTimeout(() => { this.success_mgs = ''; }, 2000);
          form.reset();
        } else {
          this.success_mgs = '';
        }
      }, err => {
        console.log(err)
      }
    )
  }

  getStateCode(event: any) {
    let stateCode = event.target.value;
    let state_code = "";
    this.stateList.forEach((value: any) => {
      if (value.name == stateCode) {
        state_code = value.code;
      }
    });
    this._apiRequest.getCities().subscribe(res => {
      this.cities_list = res.data[state_code];
    })
  }

}
