import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../core/services/common.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit {


  constructor(
    public _common: CommonService
  ) { }

  ngOnInit(): void {
  }

}
