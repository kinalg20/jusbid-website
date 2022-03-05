import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { CommonService } from 'src/app/modules/core/services/common.service';

@Component({
  selector: 'app-become-travel-agent-form',
  templateUrl: './become-travel-agent-form.component.html',
  styleUrls: ['./become-travel-agent-form.component.scss']
})
export class BecomeTravelAgentFormComponent implements OnInit {

  stateList: any = [];
  cities_list: any = [];
  success_mgs: string = '';

  constructor(private _apiRequest: ApiRequestService, private common: CommonService) { }

  ngOnInit(): void {

    this._apiRequest.getStates().subscribe(res => {
      this.stateList = res.data;
    });

  }


  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    let addtravelagentData = {
      agent_name: data.agent_name,
      email: data.email,
      contact_no: data.contact,
      address: data.address,
      state: data.state,
      city: data.city,
      company_name: data.company,
      country: 'India',
      zip: data.zip,
      area: data.area
    }
    this._apiRequest.createTravel(addtravelagentData).subscribe(
      res => {
        if (res.responseCode == 200) {
          this.success_mgs = res.msg;
          setTimeout(() => { this.success_mgs = ''; }, 2000);
          form.reset();
        } else {
          this.success_mgs = '';
        }
      }, err => {
        this.success_mgs = '';
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
