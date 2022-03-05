import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'booking-gst-details-form',
  templateUrl: './booking-gst-details-form.component.html',
  styleUrls: ['./booking-gst-details-form.component.scss']
})
export class BookingGstDetailsFormComponent implements OnInit {

  company_name: string = '';
  registration_no: string = '';

  @Output() output_company_name: EventEmitter<any> = new EventEmitter();
  @Output() output_registration_no: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  getCompanyName(event: any) {
    this.output_company_name.emit(event.target.value);
  }
  getRegistrationNo(event: any) {
    this.output_registration_no.emit(event.target.value);
  }

}
