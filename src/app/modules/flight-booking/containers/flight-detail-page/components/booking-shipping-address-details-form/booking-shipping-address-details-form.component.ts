import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';

@Component({
  selector: 'booking-shipping-address-details-form',
  templateUrl: './booking-shipping-address-details-form.component.html',
  styleUrls: ['./booking-shipping-address-details-form.component.scss']
})
export class BookingShippingAddressDetailsFormComponent implements OnInit {

  street: string = '';
  state: string = 'RJ';
  city: string = 'Udaipur';
  country: string = 'INDIA';
  PostalCode: string = '';

  @Output() output_street: EventEmitter<any> = new EventEmitter();
  @Output() output_State: EventEmitter<any> = new EventEmitter();
  @Output() output_City: EventEmitter<any> = new EventEmitter();
  @Output() output_Country: EventEmitter<any> = new EventEmitter();
  @Output() output_PostalCode: EventEmitter<any> = new EventEmitter();

  constructor(public apiRequestService: ApiRequestService) { }

  ngOnInit(): void {
    this.getStatesList();
  }

  getStreet(event: any) {
    this.output_street.emit(event.target.value);
  }
  getPostalCode(event: any) {
    this.output_PostalCode.emit(event.target.value);
  }



  statesList: any = [];
  citiesList: any = [];

  getStatesList() {
    this.apiRequestService.getStates().subscribe(
      res => {
        this.statesList = res.data;
      }
    );
  }
  getCitiesList(stateCode: string) {
    this.apiRequestService.getCities().subscribe(
      res => {
        this.citiesList = res.data[stateCode];
      }
    );
  }


  getStateName(event: any) {
    this.getCitiesList(event.target.value);
    console.log(event.target.value);
    this.output_State.emit(event.target.value);
  }
  getCity(event: any) {
    console.log(event.target.value);
    this.output_City.emit(event.target.value);
  }
  getCountry(event: any) {
    console.log(event.target.value);
    this.output_Country.emit(event.target.value);
  }


}
