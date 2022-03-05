import { Component, OnInit } from '@angular/core';
import { FlightService } from '../core/services/flight.service';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss']
})
export class FlightBookingComponent implements OnInit {

  constructor(public flightService: FlightService) { }

  ngOnInit(): void {
  }

}
