import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlightService } from 'src/app/modules/core/services/flight.service';

@Component({
  selector: 'traveller-details-child-form',
  templateUrl: './traveller-details-child-form.component.html',
  styleUrls: ['./traveller-details-child-form.component.scss']
})
export class TravellerDetailsChildFormComponent implements OnInit {

  @Input() group: string = '';
  @Input() data: any;
  @Input() formIndex: number = 0;
  @Output() IndexOfRemoveChildForm: EventEmitter<number> = new EventEmitter();
  @Output() childObjData: EventEmitter<any> = new EventEmitter();


  name_title: string = '';
  firstname: string = '';
  lastname: string = '';
  gender: string = 'M';
  dob: string = '';
  nationality: string = 'IN';

  todayDate: any = new Date().getFullYear() + '-' +("0"+(new Date().getMonth()+1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
  }

  removeChildForm(index: number) {
    this.is_selected_child_form = false;
    this.IndexOfRemoveChildForm.emit(index);
  }

  selectGender(gender: string) {
    this.gender = gender;
  }

  is_selected_child_form: boolean = false;
  selectChildData(index: number) {
    this.is_selected_child_form = !this.is_selected_child_form;
    let childDetails: any = {
      _Prefix: this.name_title,
      _First: this.firstname.trim(),
      _Last: this.lastname.trim(),
      _DOB: this.dob,
      _Gender: this.gender,
      _Nationality: this.nationality,
      _TravelerType: 'CNN',
      _Age: this.flightService.getAge(this.dob),
      is_selected: this.is_selected_child_form,
      index: index
    }
    this.childObjData.emit(childDetails);
  }

}
