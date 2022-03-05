import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/modules/core/services/common.service';

@Component({
  selector: 'booking-details-contact-form',
  templateUrl: './booking-details-contact-form.component.html',
  styleUrls: ['./booking-details-contact-form.component.scss']
})
export class BookingDetailsContactFormComponent implements OnInit {

  countryCode: string = '91';
  mobileNumber: string = '';
  emailAddress: string = '';

  @Output() output_countryCode: EventEmitter<string> = new EventEmitter();
  @Output() output_mobileNumber: EventEmitter<string> = new EventEmitter();
  @Output() output_emailAddress: EventEmitter<string> = new EventEmitter();

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {  }

  getCountryCode(event: any) {
    this.output_countryCode.emit(event.target.value);
  }
  getMobileNumber(event: any) {
    this.output_mobileNumber.emit(event.target.value);
  }
  getEmailAddress(event: any) {
    this.output_emailAddress.emit(event.target.value);
  }



}
