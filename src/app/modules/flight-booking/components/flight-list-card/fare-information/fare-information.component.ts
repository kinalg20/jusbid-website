import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fare-information',
  templateUrl: './fare-information.component.html',
  styleUrls: ['./fare-information.component.scss']
})
export class FareInformationComponent implements OnInit {

  @Input() AirPricingInfo: any = [];

  constructor() { }

  ngOnInit(): void { }

  getPrice(price: any) {
    let priceValue = price ? price.slice(3, price.length) : 0;
    return JSON.parse(priceValue);
  }

}
