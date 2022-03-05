import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showFiterModel: boolean = false;
  priceSelection: any = 0;
  value: any;
  highValue: any;
  options: Options = {};
  minValue: number = 0;
  maxValue: number = 100;
  price_Selection: any = 0;

  constructor() { }

  ngOnInit(): void {
  }

 @ViewChild('searchForm') searchForm: NgForm | any;
  searchTerm: string = "";


  // Show Filter Modal in responsive
  show_filter: boolean = false;
  showFilter(show: number) {
    if (show == 0) {
      this.show_filter = true;
    }
    else if (show == 1) {
      this.show_filter = false;
    }
  }


//showing Price Selections 
  showAllHotelList() {
    this.priceSelection = 0;
    setTimeout(() => {
     // this.getSerachHotels(this.searchQuery);
    }, 2000)
    // this.searchTerm = '';
  }


//Price Range Starting & ending Value 
  startPriceRangeValue: number = 0;
  endPriceRangeValue: number = 0;

// for Price Range 
  slider_Event() {
    console.log("priceSelection", this.price_Selection);
  }
}
