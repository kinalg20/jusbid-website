import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ApiRequestService } from '../core/services/api-requests.service';
import { CommonService } from '../core/services/common.service';


@Component({
  selector: 'app-travel-agent-panel',
  templateUrl: './travel-agent-panel.component.html',
  styleUrls: ['./travel-agent-panel.component.scss']
})
export class TravelAgentPanelComponent implements OnInit {
  bsValue: Date = new Date();
  minDate = new Date();
  maxDate = new Date();
  returnDate = new Date();
  maxReturnDate = new Date();
  value!: Date;
  TravelBookingDetails: any = [];
  selectedTravel: any = [];
  userData: any = [];
  dtOptions: any = [];
  TravelDetails: any = [];
  selectdata: any = [];
  CommissionValue: any = [];
  biding_price: any = [];
  totalcommission: number = 0;
  BDEListDetails: any = [];
  parentBDE: any = [];
  BDEName: any = [];


  constructor(
    public datepipe: DatePipe,
    public apiRequest: ApiRequestService,
    public _common: CommonService,

  ) {
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.minDate.getDate() + 90);
    this.returnDate.setDate(this.minDate.getDate() + 1);
    this.maxReturnDate.setDate(this.maxDate.getDate() + 91);
    this.userData = this._common.getLogedinUserData();
    this.getTravelAgentBooking(this.userData.userId);
    this.getTravelAgentBookingCommission(this.userData.userId)

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      pageLength: 10,
      processing: true,
      lengthChange: true,
      scrollX: true
      // dom: '<f><"pull-right"l>tip'
    };

  }
  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: true,
  };

  getTravelAgentBooking(uid: any) {
    this.apiRequest.getTravelAgentBooking(uid).subscribe(
      res => {
        if (res.responseCode == 200) {
          this.TravelBookingDetails = res.data;
          res.data.forEach((value: any) => {
            this.biding_price = value.price;
      //      console.log('Price', this.biding_price)
          })
        } else {
          console.log(res);
        }
      }, err => {
        console.log(err);
      }
    );
  }
  getTravelAgentBookingCommission(uid: any) {
    this.apiRequest.getTravelAgentCommission(uid).subscribe(
      res => {
        if (res.responseCode == 200) {
        //  console.log('travel', res);
          res.data.forEach((value: any) => {
            if (value.status == 'Approved') {
              this.TravelDetails.push(value);
              this.CommissionValue = value.commission;
              this.parentBDE = value.parent_bde;
          //    console.log('tyutyu', this.CommissionValue)
            }
            if (res.ta_com_ispaid == 'ture') {
              this.totalcommission = (this.biding_price * (this.CommissionValue / 100));
          //    console.log('totalcommission', this.totalcommission);
            }
          })
          this.apiRequest.getBDEList(uid).subscribe(
            res => {
              if (res.responseCode == 200) {
           //     console.log('BDE', res);
                res.data.forEach((value: any) => {
                  if (value.status == 'Approved') {
              //      console.log('BDEApproved', value);
                    this.BDEListDetails.push(value);
                  }
                  if (value.userId == this.parentBDE) {
              //      console.log("name", value.firstname + ' ' + value.lastname);
                    this.BDEName = value.firstname + ' ' + value.lastname;
                  }
                })
              }
            }
          )
        }
      })
  }
}



