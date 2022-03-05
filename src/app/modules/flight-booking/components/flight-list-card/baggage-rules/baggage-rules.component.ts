import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'baggage-rules',
  templateUrl: './baggage-rules.component.html',
  styleUrls: ['./baggage-rules.component.scss']
})
export class BaggageRulesComponent implements OnInit {

  @Input() fareInfoDetails: any = [];
  @Input() BaggageAllowanceObj: any = {};

  MaxWeight:any = {};

  constructor() { }

  ngOnInit(): void {
    this.MaxWeight = this.BaggageAllowanceObj['air:MaxWeight'];

    console.log("max weight:", this.MaxWeight)
  }

  getPrice(price: any) {
    let priceValue = price ? price.slice(3, price.length) : 0;
    return JSON.parse(priceValue);
  }

}
