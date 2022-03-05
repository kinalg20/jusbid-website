import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { FlightService } from 'src/app/modules/core/services/flight.service';

@Component({
  selector: 'traveller-details-adults-form',
  templateUrl: './traveller-details-adults-form.component.html',
  styleUrls: ['./traveller-details-adults-form.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TravellerDetailsAdultsFormComponent implements OnInit {

  @Input() group: string = '';
  @Input() data: any;
  @Input() formIndex: number = 0;
  @Output() IndexOfRemoveAdultForm: EventEmitter<number> = new EventEmitter();
  @Output() adultsObjData: EventEmitter<any> = new EventEmitter();


  name_title: string = '';
  firstname: string = '';
  lastname: string = '';
  gender: string = 'M';
  dob: string = '';
  nationalityStr: string = 'IN';

  adultObj: any = {};

  todayDate: any = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);

  constructor(public __flightService: FlightService) { }

  nationality: any = [];
  ngOnInit(): void {
    this.nationality = this.__flightService.natinalityList;
  }

  removeAdultForm(index: number) {
    this.is_selected_adult_form = false;
    this.IndexOfRemoveAdultForm.emit(index);
  }

  selectGender(gender: string) {
    this.gender = gender;
  }

  is_selected_adult_form: boolean = false;
  selectAdultData(index: number) {
    this.is_selected_adult_form = !this.is_selected_adult_form;
    let adultDetails: any = {
      _Prefix: this.name_title,
      _First: this.firstname.trim(),
      _Last: this.lastname.trim(),
      _DOB: this.dob,
      _Gender: this.gender,
      _Nationality: this.nationalityStr,
      _TravelerType: 'ADT',
      _Age: this.getAge(this.dob),
      is_selected: this.is_selected_adult_form,
      index: index
    }
    this.adultsObjData.emit(adultDetails);
  }

  getAge(date: string) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


}
