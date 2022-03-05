import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';


@Component({
  selector: 'flights-filters-section',
  templateUrl: './flights-filters-section.component.html',
  styleUrls: ['./flights-filters-section.component.scss']
})
export class FlightsFiltersSectionComponent implements OnInit {

  @Output() selectedAirlinesCodeList: EventEmitter<string> = new EventEmitter();
  @Output() selectedActiveStop: EventEmitter<number> = new EventEmitter();
  @Output() selectedPriceRange: EventEmitter<any> = new EventEmitter();
  @Input() min_Price_range: any;
  @Input() max_Price_range: any;

  AirLinesList: any = [];
  is_apply_filters: boolean = false;
  flight_Stops_List: any = [0, 1, 2, 3];
  value: any;
  highValue: any;
  options: Options = {};
  minValue: number = 0;
  maxValue: number = 100;

  constructor(public apiRequestService: ApiRequestService) { }

  ngOnInit(): void {
    this.getAirLinesList();
    this.options = {
      floor: 0,
      ceil: 100,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return "";
          case LabelType.High:
            return "";
          default:
            return "";
        }
      }
    }
    this.value = this.options.floor = this.minValue = this.min_Price_range;
    this.highValue = this.options.ceil = this.maxValue = this.max_Price_range;
  }

  getAirLinesList() {
    this.apiRequestService.getAirlines().subscribe(
      res => {
        if (res.responseCode === 200) {
          this.AirLinesList = res.data;
        }
      }
    );
  }
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
  selected_airlines_code_list: any = [];
  getAirLineCode(code: any) {
    this.is_apply_filters = true;
    if (!this.selected_airlines_code_list.includes(code)) {
      this.selected_airlines_code_list.push(code)
    } else {
      var index = this.selected_airlines_code_list.indexOf(code);
      if (index > -1) {
        this.selected_airlines_code_list.splice(index, 1);
      }
    }
    this.selectedAirlinesCodeList.emit(this.selected_airlines_code_list);
  }
  resetFilters() {
    this.selected_airlines_code_list = []
    this.selectedAirlinesCodeList.emit(this.selected_airlines_code_list)
    window.location.reload()
  }

  activeStop: any = null;
  getFlightStop(stop: any) {
    this.is_apply_filters = true;
    this.activeStop = stop;
    this.selectedActiveStop.emit(this.activeStop)
  }

  sortPrice: string = '';
  getPrice(event: any) { 
    this.sortPrice = event.target.value;
  }

  priceSelection: any = 0;
  sliderEvent() {
    this.is_apply_filters = true;
    this.selectedPriceRange.emit(this.priceSelection)
    console.log("priceSelection", this.priceSelection);
  }

}
