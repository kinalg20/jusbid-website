import { Component, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'flight-list-section',
  templateUrl: './flight-list-section.component.html',
  styleUrls: ['./flight-list-section.component.scss']
})
export class FlightListSectionComponent implements OnInit {


  @Input() origin: string = '';
  @Input() destination: string = '';
  @Input() flightDate: string = '';

  @ViewChild('DateWiseFlight_slider') DateWiseFlight_slider: any;
  is_open_round_trip_valr: boolean = false;
  DateWiseFlight: any = [
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
    {
      date: "18 Mar, Thu",
      price: 5265
    },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  moveLeft() {
    this.DateWiseFlight_slider.nativeElement.scrollLeft += 50;
  };
  moveRight() {
    this.DateWiseFlight_slider.nativeElement.scrollLeft += 50;
  };

  getroundtrip(is_open_round_trip_container: boolean) {
    this.is_open_round_trip_valr = is_open_round_trip_container;
  }




}
