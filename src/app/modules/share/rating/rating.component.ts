import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

 @Input() ratingNumber: any;

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rating2: [],
    });

  }

  ngOnInit(): void {
  }

}
