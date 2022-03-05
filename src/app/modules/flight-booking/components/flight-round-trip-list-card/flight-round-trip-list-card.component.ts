import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';

@Component({
  selector: 'flight-round-trip-list-card',
  templateUrl: './flight-round-trip-list-card.component.html',
  styleUrls: ['./flight-round-trip-list-card.component.scss']
})
export class FlightRoundTripListCardComponent implements OnInit {
  active: number = 0;
  @Input() for_open_round_trip_val: boolean = false;
  @Input() connecting_flight_list: any = [];
  @Input() connect_Flights_List: any = [];
  @Input() airLinesData: any = [];
  @Input() airPortsList: any = [];
  @Input() searchQueryParams: any = {};
  @Input() FareInfoList: any = [];


  constructor(public apiRequestService: ApiRequestService, private router: Router) { }

  roundTripFlights: any = [];
  ngOnInit(): void {
    console.log("from flight list section:", this.roundTripFlights)
    // console.log("from flight list section connect_Flights_List:", this.connect_Flights_List)

    this.connecting_flight_list.forEach((flight: any) => {

      let first_flight_obj: any = flight[0];
      let return_flight_obj: any = flight[1];
      let first_flight_BookingOption: any = first_flight_obj['air:Option'];
      let return_flight_BookingOption: any = return_flight_obj['air:Option'];

      let flight_obj: any = {
        first_flight: {},
        return_flight: {}
      };

      if (Array.isArray(first_flight_BookingOption)) {
        // if first_flight_BookingOption is array
      } else {
        // if first_flight_BookingOption is object
        if (Array.isArray(first_flight_BookingOption['air:BookingInfo'])) {
          // If flight is connecting flight
          let connectingFlightList: any = [];
          let fareInfoList: any = [];
          first_flight_BookingOption['air:BookingInfo'].forEach((first_flight_booking_info: any, index: number) => {
            connectingFlightList.push(this.getSegmentBySegmentKey(first_flight_booking_info?.SegmentRef))
          });
          first_flight_BookingOption['air:BookingInfo'].forEach((first_flight_booking_info: any, index: number) => {
            fareInfoList.push(this.getFareInfoByFareInfoRef(first_flight_booking_info?.FareInfoRef))
          });
          flight_obj.first_flight = {
            ...first_flight_obj,
            flightSegment: { ...connectingFlightList[0], fareInfo: fareInfoList[0] },
            connectingFlights: connectingFlightList,
            fareInfoList: fareInfoList
          };
        } else {
          flight_obj.first_flight = {
            ...first_flight_obj,
            flightSegment: {
              ...this.getSegmentBySegmentKey(first_flight_BookingOption['air:BookingInfo']?.SegmentRef),
              fareInfo: this.getFareInfoByFareInfoRef(first_flight_BookingOption['air:BookingInfo']?.FareInfoRef),
            },
          };
          if (Array.isArray(first_flight_BookingOption['air:BookingInfo'])) {
          } else {
          }
        }
      }


      // For return flight
      if (Array.isArray(return_flight_BookingOption)) {
        // if return_flight_BookingOption is array
      } else {
        // if return_flight_BookingOption is object
        if (Array.isArray(return_flight_BookingOption['air:BookingInfo'])) {
          // If flight is connecting flight
          let connectingFlightList: any = [];
          let fareInfoList: any = [];
          return_flight_BookingOption['air:BookingInfo'].forEach((return_flight_booking_info: any, index: number) => {
            connectingFlightList.push(this.getSegmentBySegmentKey(return_flight_booking_info?.SegmentRef))
          });
          return_flight_BookingOption['air:BookingInfo'].forEach((return_flight_booking_info: any, index: number) => {
            fareInfoList.push(this.getFareInfoByFareInfoRef(return_flight_booking_info?.FareInfoRef))
          });
          flight_obj.return_flight = {
            ...return_flight_obj,
            flightSegment: { ...connectingFlightList[0], fareInfo: fareInfoList[0] },
            connectingFlights: connectingFlightList,
            fareInfoList: fareInfoList
          };
        } else {
          flight_obj.return_flight = {
            ...return_flight_obj,
            flightSegment: {
              ...this.getSegmentBySegmentKey(return_flight_BookingOption['air:BookingInfo']?.SegmentRef),
              fareInfo: this.getFareInfoByFareInfoRef(return_flight_BookingOption['air:BookingInfo']?.FareInfoRef),
            },
          };
          if (Array.isArray(return_flight_BookingOption['air:BookingInfo'])) {
          } else {
          }
        }
      }

      if (!this.isEmpty(flight_obj.first_flight) && !this.isEmpty(flight_obj.return_flight)) {
        this.roundTripFlights.push(flight_obj);
      }

    });

  }

  isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  getAirlineObj(CarrierCode: string) {
    let airLineObj: any = {};
    this.airLinesData.forEach((airline: any) => {
      if (airline.IATA === CarrierCode) {
        airLineObj = airline;
      }
    });
    return airLineObj;
  }

  is_openCancellationFeesModal: boolean = false;
  openCancellationFeesModal() {
    this.is_openCancellationFeesModal = !this.is_openCancellationFeesModal;
  }
  tabChange(index: number) {
    this.active = index;
  }


  roundTripFlightsList: any = [];
  getSegments(segmentKey: string) {
    this.connect_Flights_List.forEach((flight: any, index: number) => {
      if (flight.Key === segmentKey) {
        this.roundTripFlightsList.push(flight);
        // console.log("Flight:", flight.Origin + ' => ' + flight.Destination + '- Index:' + index);
        // console.log("Flight:", flight);
      }
    });
    // console.log("Flight:", this.roundTripFlightsList);
  }


  getSegmentBySegmentKey(segmentKey: string) {
    let segmentFlight: any = {};
    this.connect_Flights_List.forEach((segment: any) => {
      if (segment.Key === segmentKey) {
        segmentFlight = segment;
      }
    });
    return segmentFlight;
  }
  getFareInfoByFareInfoRef(FareInfo_ref: string) {
    let FareInfoObj: any = {};
    this.FareInfoList.forEach((FareInfo: any) => {
      if (FareInfo.Key === FareInfo_ref) {
        FareInfoObj = FareInfo;
      }
    });
    return FareInfoObj;
  }

  seconds_to_days_hours_mins_secs_str(mins: any) {
    let h: any = Math.floor(mins / 60), m: any = mins % 60;
    h = h < 10 ? '' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}hrs ${m}mins`;
  }

  getCityNameByIATA_Code(IATA_code: any) {
    let cityName: any = "";
    this.airPortsList.forEach((airPort: any) => {
      if (airPort.IATA_code === IATA_code) {
        cityName = airPort.city_name;
      }
    });
    return cityName;
  }

  getPrice(price: any) {
    let priceValue = price ? price.slice(3, price.length) : 0;
    return JSON.parse(priceValue);
  }


  selectedFlights: any = [];


  selected_first_flight_index: number = -1;
  selected_return_flight_index: number = -1;
  selectFlight(flightType: string, flight: any, index: number) {
    // console.log("flightType", flightType)
    // console.log("flight", flight)
    // console.log("flightSegmentKey", index)
    if (flightType === 'FIRST_FLIGHT') {
      this.selected_first_flight_index = index;
      this.selectedFlights[0] = (flight);
    } else if (flightType === 'RETURN_FLIGHT') {
      this.selected_return_flight_index = index;
      this.selectedFlights[1] = (flight);
    }
    this.getFlights();
  }
  connectingFlights : any ;
  getFlights() {
    console.log("selectedFlights", this.selectedFlights)
    this.selectedFlights.forEach((connectingFlights: any) => {
     console.log("connectingFlights",connectingFlights)
  

    });
  }

  bookNow() {
    this.apiRequestService.setDetailPageData({ flights: this.selectedFlights , searchQueryParams: this.searchQueryParams, airLinesData: this.airLinesData});
    this.router.navigate(['/flights-search/flight-details']);
  }




}