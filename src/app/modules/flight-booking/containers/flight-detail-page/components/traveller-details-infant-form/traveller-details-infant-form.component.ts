import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'traveller-details-infant-form',
  templateUrl: './traveller-details-infant-form.component.html',
  styleUrls: ['./traveller-details-infant-form.component.scss']
})
export class TravellerDetailsInfantFormComponent implements OnInit {

  @Input() group: string = '';
  @Input() data: any;
  @Input() formIndex: number = 0;
  @Output() IndexOfRemoveInfantForm: EventEmitter<number> = new EventEmitter();
  @Output() infantObjData: EventEmitter<any> = new EventEmitter();


  name_title: string = '';
  firstname: string = '';
  lastname: string = '';
  gender: string = 'M';
  dob: string = '';
  nationality: string = 'IN';

  todayDate: any = new Date().getFullYear() + '-' +("0"+(new Date().getMonth()+1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);

  constructor() { }

  ngOnInit(): void {
  }

  removeInfantForm(index: number) {
    this.is_selected_infant_form = false;
    this.IndexOfRemoveInfantForm.emit(index);
  }

  selectGender(gender: string) {
    this.gender = gender;
  }

  is_selected_infant_form: boolean = false;
  selectInfantData(index: number) {
    this.is_selected_infant_form = !this.is_selected_infant_form;
    let infantDetails: any = {
      _Prefix: this.name_title,
      _First: this.firstname.trim(),
      _Last: this.lastname.trim(),
      _DOB: this.dob,
      _Gender: this.gender,
      _Nationality: this.nationality,
      _TravelerType: 'CNN',
      _Age: this.getAge(this.dob),
      is_selected: this.is_selected_infant_form,
      index: index
    }
    this.infantObjData.emit(infantDetails);
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
