import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cancellation-policy',
  templateUrl: './cancellation-policy.component.html',
  styleUrls: ['./cancellation-policy.component.scss']
})
export class CancellationPolicyComponent implements OnInit {

  @Input() AirPricingInfo: any = [];

  constructor() { }

  ngOnInit(): void {
    console.log("Cancle", this.AirPricingInfo)
    console.log("Cancle", this.AirPricingInfo.Refundable)
  }

  getPrice(price: any) {
    let priceValue = price ? price.slice(3, price.length) : 0;
    return JSON.parse(priceValue);
  }

}
