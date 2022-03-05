import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { CommonService } from 'src/app/modules/core/services/common.service';
import { FlightService } from 'src/app/modules/core/services/flight.service';

@Component({
  selector: 'app-flight-listing-page',
  templateUrl: './flight-listing-page.component.html',
  styleUrls: ['./flight-listing-page.component.scss']
})
export class FlightListingPageComponent implements OnInit {

  responseData: any = {};
  airLinesData: any = [];
  airPortsList: any = [];
  response: boolean = false;
  searchQuery: any;
  is_open_round_trip_valr: boolean = false;

  min_Price_range: any;
  max_Price_range: any;

  jusbid_Flight_List: any = [];
  jusbid_FlightDetailsList_org: any = [];
  flightListArray: any = [];
  FareInfoList: any = [];

  constructor(private route: ActivatedRoute, private apiRequestService: ApiRequestService, public __commonService: CommonService, private flightService: FlightService) { }


  is_Tow_Way_flight: boolean = false;

  ngOnInit(): void {
    this.getAirlines();
    this.route.queryParams.subscribe(params => {

      this.searchQuery = {
        ADT: Number(params.ADT),
        CNN: Number(params.CNN),
        INF: Number(params.INF),
        arrival: params.arrival,
        ...(params.arrival_back && { arrival_back: params.arrival_back }),
        departure: params.departure,
        ...(params.departure_back && { departure_back: params.departure_back }),
        flightDate: params.flightDate,
        ...(params.flightDate_back && { flightDate_back: params.flightDate_back, }),
        is_two_way: JSON.parse(params.is_two_way)
      };

      this.is_Tow_Way_flight = JSON.parse(params.is_two_way);

    });

    if(this.is_Tow_Way_flight){
      this.min_Price_range = 0;
      this.max_Price_range = 5000;
    }

    let searchKey: any = localStorage.getItem('flightSearchKey') ? localStorage.getItem('flightSearchKey') : {};

    console.log("Storage: ", JSON.parse(searchKey));
    // this.getSegmentList(searchKey);
    this.getSegmentList(this.searchQuery);


    this.apiRequestService.getAirPorts().subscribe(
      res => {
        this.airPortsList = res.data;
      }
    );
  }

  connect_Flights_List: any = [];



  connecting_flight_list: any = [];

  getSegmentList(params: any) {
    this.apiRequestService.searchFlights(params).subscribe(
      res => {
        if (res.responseCode == 200) {

          if (!res.data['SOAP:Fault']) {

            let flightSegmentList = res.data['air:LowFareSearchRsp']['air:AirSegmentList']['air:AirSegment'];
            this.connect_Flights_List = flightSegmentList;
            // console.log("Connecting flight segment:", this.connect_Flights_List)

            this.FareInfoList = res.data['air:LowFareSearchRsp']['air:FareInfoList']['air:FareInfo'];
            let AirPricePointList: any = res.data['air:LowFareSearchRsp']['air:AirPricePointList']['air:AirPricePoint'];

            // console.log("FlightOption", res.data);
            AirPricePointList.forEach((airPricePoint: any, index: number) => {

              let FlightOption = airPricePoint['air:AirPricingInfo']['air:FlightOptionsList']['air:FlightOption'];
              let Two_Way_Connection_SegmentIndex: number = 0;
              let Two_way_BookingInfo_List: any = [];

              this.connecting_flight_list.push(FlightOption);

              if (Array.isArray(FlightOption)) {
                // For Round Trip
                FlightOption.forEach(element => {
                  let ConnectVar = element['air:Option']['air:Connection'];
                  if (ConnectVar) {
                    // 2Way
                    Two_Way_Connection_SegmentIndex = ConnectVar.SegmentIndex;
                    Two_way_BookingInfo_List = element['air:Option']['air:BookingInfo']

                    if (Array.isArray(Two_way_BookingInfo_List)) {
                      let connectingFlightSegment: any = [];
                      let array2: any = [];
                      Two_way_BookingInfo_List.forEach((bookingInfo: any) => {
                        //---------------getting flight segments---------------------------------------
                        // console.log("Connecting flightSegmentList", flightSegmentList)
                        var filteredFlightSegment = flightSegmentList.filter(function (segments: any) {
                          return segments.Key == bookingInfo['SegmentRef'];
                        });
                        if (filteredFlightSegment || bookingInfo) {
                          connectingFlightSegment = filteredFlightSegment.concat(connectingFlightSegment);
                          array2.push(bookingInfo);
                        }

                        AirPricePointList[index].customSegment = connectingFlightSegment.slice().reverse();
                        AirPricePointList[index].indexFlight = { fisrtFlight: connectingFlightSegment.slice().reverse()[0], lastFlight: connectingFlightSegment.slice().reverse().slice(-1)[0] };
                        AirPricePointList[index].bookingInfoObj = array2;
                      });
                    }

                  } else {
                    // 1Way
                    if (Array.isArray(element)) {
                      // FlightOption.forEach((flightOption:any) => {
                      //   console.log("Sge",flightOption['air:Option']['air:BookingInfo']['SegmentRef']);
                      // });
                    } else {

                      if (Array.isArray(element['air:Option'])) {
                        element['air:Option'].forEach((optionObj: any) => {

                          if (Array.isArray(optionObj['air:BookingInfo'])) {
                            optionObj['air:BookingInfo'].forEach((bookingInfo: any) => {
                              //---------------getting flight segments---------------------------------------

                              var filteredFlightSegment = flightSegmentList.filter(function (segments: any) {
                                return segments.Key == bookingInfo['SegmentRef'];
                              });

                              if (filteredFlightSegment || bookingInfo) {
                                AirPricePointList[index].customSegment = filteredFlightSegment ? filteredFlightSegment : null;
                                AirPricePointList[index].bookingInfoObj = bookingInfo ? bookingInfo : null;
                              }

                            });
                          } else {
                            //---------------getting flight segments---------------------------------------

                            var filteredFlightSegment = flightSegmentList.filter(function (segments: any) {
                              return segments.Key == optionObj['air:BookingInfo']['SegmentRef'];
                            });

                            if (filteredFlightSegment || optionObj['air:BookingInfo']) {
                              AirPricePointList[index].customSegment = filteredFlightSegment ? filteredFlightSegment : null;
                              AirPricePointList[index].bookingInfoObj = optionObj['air:BookingInfo'] ? optionObj['air:BookingInfo'] : null;
                            }

                          }

                        });
                      } else {
                        // console.log("Sge", element['air:Option']['air:BookingInfo']['SegmentRef']);

                        let currentSegmentKey = element['air:Option']['air:BookingInfo']['SegmentRef'];

                        var filteredFlightSegment = flightSegmentList.filter(function (segments: any) {
                          return segments.Key == currentSegmentKey;
                        });

                        if (filteredFlightSegment) {
                          AirPricePointList[index].customSegment = filteredFlightSegment ? filteredFlightSegment : null;
                        }

                        //------------get flight data using segment ref----------------------------------
                      }

                    }
                  }
                });
              } else {
                // For One Way
                let ConnectVar = FlightOption['air:Option']['air:Connection'];
                if (ConnectVar) {
                  // 2Way
                  Two_Way_Connection_SegmentIndex = ConnectVar.SegmentIndex;
                  Two_way_BookingInfo_List = FlightOption['air:Option']['air:BookingInfo']

                  if (Array.isArray(Two_way_BookingInfo_List)) {
                    let connectingFlightSegment: any = [];
                    let array2: any = [];
                    Two_way_BookingInfo_List.forEach((bookingInfo: any) => {
                      //---------------getting flight segments---------------------------------------

                      var filteredFlightSegment = flightSegmentList.filter(function (segments: any) {
                        return segments.Key == bookingInfo['SegmentRef'];
                      });
                      if (filteredFlightSegment || bookingInfo) {
                        connectingFlightSegment = filteredFlightSegment.concat(connectingFlightSegment);
                        array2.push(bookingInfo);
                      }

                      AirPricePointList[index].customSegment = connectingFlightSegment.slice().reverse();

                      AirPricePointList[index].bookingInfoObj = array2;

                    });
                  }

                } else {
                  // 1Way
                  if (Array.isArray(FlightOption)) {
                    // FlightOption.forEach((flightOption:any) => {
                    //   console.log("Sge",flightOption['air:Option']['air:BookingInfo']['SegmentRef']);
                    // });
                  } else {
                    if (Array.isArray(FlightOption['air:Option'])) {
                      FlightOption['air:Option'].forEach((optionObj: any) => {

                        if (Array.isArray(optionObj['air:BookingInfo'])) {
                          optionObj['air:BookingInfo'].forEach((bookingInfo: any) => {
                            //---------------getting flight segments---------------------------------------

                            var filteredFlightSegment = flightSegmentList.filter(function (segments: any) {
                              return segments.Key == bookingInfo['SegmentRef'];
                            });

                            if (filteredFlightSegment || bookingInfo) {
                              AirPricePointList[index].customSegment = filteredFlightSegment ? filteredFlightSegment : null;
                              AirPricePointList[index].bookingInfoObj = bookingInfo ? bookingInfo : null;
                            }

                          });
                        } else {
                          //---------------getting flight segments---------------------------------------

                          var filteredFlightSegment = flightSegmentList.filter(function (segments: any) {
                            return segments.Key == optionObj['air:BookingInfo']['SegmentRef'];
                          });

                          if (filteredFlightSegment || optionObj['air:BookingInfo']) {
                            AirPricePointList[index].customSegment = filteredFlightSegment ? filteredFlightSegment : null;
                            AirPricePointList[index].bookingInfoObj = optionObj['air:BookingInfo'] ? optionObj['air:BookingInfo'] : null;
                          }

                        }

                      });
                    } else {
                      // console.log("Sge", FlightOption['air:Option']['air:BookingInfo']['SegmentRef']);

                      let currentSegmentKey = FlightOption['air:Option']['air:BookingInfo']['SegmentRef'];

                      var filteredFlightSegment = flightSegmentList.filter(function (segments: any) {
                        return segments.Key == currentSegmentKey;
                      });

                      if (filteredFlightSegment) {
                        AirPricePointList[index].customSegment = filteredFlightSegment ? filteredFlightSegment : null;
                      }

                      //------------get flight data using segment ref----------------------------------
                    }

                  }
                }
              }

            });


            // console.log("Flight air option:", this.connecting_flight_list)
            // console.log("AirPricePointList", AirPricePointList)
            AirPricePointList.forEach((pricePointListData: any, index: number) => {
              let firstFlightObj = pricePointListData.customSegment[0];
              let lastFlightObj = pricePointListData.customSegment.slice(-1)[0];

              if (pricePointListData.customSegment.length > 1) {
                AirPricePointList[index].indexFlight = {
                  ArrivalTime: lastFlightObj.ArrivalTime,
                  AvailabilityDisplayType: firstFlightObj.AvailabilityDisplayType,
                  AvailabilitySource: firstFlightObj.AvailabilitySource,
                  Carrier: firstFlightObj.Carrier,
                  ChangeOfPlane: JSON.parse(firstFlightObj.ChangeOfPlane),
                  DepartureTime: firstFlightObj.DepartureTime,
                  Destination: lastFlightObj.Destination,
                  Distance: JSON.parse(firstFlightObj.Distance),
                  ETicketability: firstFlightObj.ETicketability,
                  Equipment: firstFlightObj.Equipment,
                  FlightNumber: JSON.parse(firstFlightObj.FlightNumber),
                  FlightTime: JSON.parse(firstFlightObj.FlightTime),
                  Group: JSON.parse(firstFlightObj.Group),
                  Key: firstFlightObj.Key,
                  LinkAvailability: firstFlightObj.LinkAvailability,
                  OptionalServicesIndicator: JSON.parse(firstFlightObj.OptionalServicesIndicator),
                  Origin: firstFlightObj.Origin,
                  ParticipantLevel: firstFlightObj.ParticipantLevel,
                  PolledAvailabilityOption: firstFlightObj.PolledAvailabilityOption,
                  AirAvailInfo: firstFlightObj['air:AirAvailInfo'],
                  FlightDetailsRef: firstFlightObj['air:FlightDetailsRef']
                };
                // console.log("Subject 2:", AirPricePointList)
              } else {
                AirPricePointList[index].indexFlight = {
                  ArrivalTime: firstFlightObj.ArrivalTime,
                  AvailabilityDisplayType: firstFlightObj.AvailabilityDisplayType,
                  AvailabilitySource: firstFlightObj.AvailabilitySource,
                  Carrier: firstFlightObj.Carrier,
                  ChangeOfPlane: JSON.parse(firstFlightObj.ChangeOfPlane),
                  DepartureTime: firstFlightObj.DepartureTime,
                  Destination: firstFlightObj.Destination,
                  Distance: JSON.parse(firstFlightObj.Distance),
                  ETicketability: firstFlightObj.ETicketability,
                  Equipment: firstFlightObj.Equipment,
                  FlightNumber: JSON.parse(firstFlightObj.FlightNumber),
                  FlightTime: JSON.parse(firstFlightObj.FlightTime),
                  Group: JSON.parse(firstFlightObj.Group),
                  Key: firstFlightObj.Key,
                  LinkAvailability: firstFlightObj.LinkAvailability,
                  OptionalServicesIndicator: JSON.parse(firstFlightObj.OptionalServicesIndicator),
                  Origin: firstFlightObj.Origin,
                  ParticipantLevel: firstFlightObj.ParticipantLevel,
                  PolledAvailabilityOption: firstFlightObj.PolledAvailabilityOption,
                  AirAvailInfo: firstFlightObj['air:AirAvailInfo'],
                  FlightDetailsRef: firstFlightObj['air:FlightDetailsRef']
                };
                // console.log("Subject 1:", pricePointListData.customSegment)
              }

            });

            //  { fisrtFlight: connectingFlightSegment.slice().reverse()[0], lastFlight: connectingFlightSegment.slice().reverse().slice(-1)[0] };

            let one_Way_Flight_List: any = [];
            let round_Trip_Flight_List: any = [];
            AirPricePointList.forEach((flight: any) => {
              if (flight?.customSegment.length == 1 && flight?.indexFlight?.Origin === this.searchQuery.departure && flight?.indexFlight?.Destination === this.searchQuery.arrival) {
                one_Way_Flight_List.push(flight)
              }
              if (flight?.customSegment.length >= 2 && flight?.indexFlight?.Origin === this.searchQuery.departure && flight?.indexFlight?.Destination === this.searchQuery.arrival) {
                round_Trip_Flight_List.push(flight)
              }
            });
            // console.log("AirPricePointList:", AirPricePointList);
            // console.log("Connecting flights flightSegmentList:", this.connect_Flights_List);
            // console.log("One way Jusbid Flight list : ", one_Way_Flight_List)
            // console.log("Round trip Jusbid Flight list : ", round_Trip_Flight_List)

            // Disply list here
            this.jusbid_Flight_List = [...one_Way_Flight_List, ...round_Trip_Flight_List]
            console.log("jusbid_Flight_List:", this.jusbid_Flight_List);
            this.jusbid_FlightDetailsList_org = this.jusbid_Flight_List;
            this.response = true;
            this.__commonService.is_list_load = false;
          } else {
            this.response = true;
            this.__commonService.is_list_load = false;
            this.jusbid_Flight_List = [];
          }

          this.setPriceFilter();

        }
      });
  }

  setPriceFilter() {
    this.min_Price_range = this.jusbid_Flight_List[0]?.TotalPrice ? JSON.parse(this.jusbid_Flight_List[0]?.TotalPrice.slice(3, this.jusbid_Flight_List[0]?.TotalPrice.length)) : 0;;
    this.max_Price_range = this.jusbid_Flight_List.slice(-1)[0]?.TotalPrice ? JSON.parse(this.jusbid_Flight_List.slice(-1)[0]?.TotalPrice.slice(3, this.jusbid_Flight_List.slice(-1)[0]?.TotalPrice.length)) : 5000;
  }



  getroundtrip(isTowWayFlight: boolean) {
    this.is_Tow_Way_flight = isTowWayFlight;
    if (!isTowWayFlight) {
      this.getSegmentList(this.searchQuery);
    }
  }

  filter_by_airlines(IATA_code_List: string) {
    if (IATA_code_List.length == 0) {
      this.jusbid_Flight_List = this.jusbid_FlightDetailsList_org;
      return
    }
    this.jusbid_Flight_List = this.jusbid_FlightDetailsList_org;
    this.jusbid_Flight_List = this.jusbid_Flight_List.filter(function (flight: any) {
      return IATA_code_List.includes(flight.customSegment[0].Carrier);
    });
  }

  getAirlines() {
    this.apiRequestService.getAirlines().subscribe(
      res => {
        if (res.responseCode === 200) {
          this.airLinesData = res.data;
        }
      }
    );
  }

  selectedStopNumber: any = null;
  filter_by_flight_stop(stop: any) {
    this.selectedStopNumber = stop;
  }

  getPrice(price: any) {
    let priceValue = price ? price.slice(3, price.length) : 0;
    return JSON.parse(priceValue);
  }

  getSelectedPriceRange(event: any) {
    this.jusbid_Flight_List = this.jusbid_FlightDetailsList_org;
    this.jusbid_Flight_List = this.jusbid_Flight_List.filter((flight: any) => this.getPrice(flight.TotalPrice) >= event[0] && this.getPrice(flight.TotalPrice) <= event[1]);
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
}
