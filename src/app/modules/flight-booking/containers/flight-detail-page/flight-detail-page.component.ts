import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map, pluck, toArray } from 'rxjs/operators';
import { ApiRequestService } from 'src/app/modules/core/services/api-requests.service';
import { CommonService } from 'src/app/modules/core/services/common.service';
import { FlightService } from 'src/app/modules/core/services/flight.service';

@Component({
  selector: 'app-flight-detail-page',
  templateUrl: './flight-detail-page.component.html',
  styleUrls: ['./flight-detail-page.component.scss']
})
export class FlightDetailPageComponent implements OnInit {
  selectedList: any
  showDetailsCard: boolean = false;
  is_select_gst_option: boolean = false;
  flight_Provider_Code: string = '';
  active: number = 0;
  flightDetailsData: any = {};
  searchQueryParams: any = {};
  airPortsList: any = [];
  Genderactive: string = 'Male';
  GenderLists = ['Female', 'Male', 'Special']

  airLinesData: any = [];

  constructor(public apiRequestService: ApiRequestService, public commonService: CommonService, public flightService: FlightService) { }

  ngOnInit(): void {
    this.selectedList = this.GenderLists[0];
    this.flightDetailsData = this.apiRequestService.getDetailPageData();
    this.searchQueryParams = this.flightDetailsData?.searchQueryParams;
    this.airLinesData = this.flightDetailsData?.airLinesData ? this.flightDetailsData?.airLinesData : [];
    this.apiRequestService.getAirPorts().subscribe(
      res => {
        this.airPortsList = res.data;
      }
    );

    let bookingCode: any;
    let bookingCode_back: any;


    if (this.searchQueryParams.is_two_way) {
      // For Round Trip
      let booking_Obj_list = this.flightDetailsData?.flights[0]['air:Option']['air:BookingInfo'];
      if (Array.isArray(booking_Obj_list)) { bookingCode = booking_Obj_list[0].BookingCode; }
      else { bookingCode = booking_Obj_list.BookingCode; }

      let booking_Obj_list_back = this.flightDetailsData?.flights[1]['air:Option']['air:BookingInfo'];
      if (Array.isArray(booking_Obj_list_back)) { bookingCode_back = booking_Obj_list_back[0].BookingCode; }
      else { bookingCode_back = booking_Obj_list_back.BookingCode; }

      let params: any = {
        Carrier: this.flightDetailsData?.flights[0]?.flightSegment?.Carrier,
        FlightNumber: this.flightDetailsData?.flights[0]?.flightSegment?.FlightNumber,
        Origin: this.flightDetailsData?.flights[0]?.flightSegment?.Origin,
        Destination: this.flightDetailsData?.flights[0]?.flightSegment?.Destination,
        DepartureTime: this.flightDetailsData?.flights[0]?.flightSegment?.DepartureTime,
        ArrivalTime: this.flightDetailsData?.flights[0]?.flightSegment?.ArrivalTime,
        FlightTime: this.flightDetailsData?.flights[0]?.flightSegment?.FlightTime,
        ProviderCode: this.flightDetailsData?.flights[0]?.flightSegment['air:AirAvailInfo']['ProviderCode'],
        Distance: this.flightDetailsData?.flights[0]?.flightSegment?.Distance,
        segmentKey: this.flightDetailsData?.flights[0]?.flightSegment?.Key,
        FareBasis: this.flightDetailsData?.flights[0]?.flightSegment?.fareInfo?.FareBasis,
        AvailabilitySource: this.flightDetailsData?.flights[0]?.flightSegment?.AvailabilitySource,
        bookingCode: bookingCode,

        carrier_back: this.flightDetailsData?.flights[1]?.flightSegment?.Carrier,
        flightNumber_back: this.flightDetailsData?.flights[1]?.flightSegment?.FlightNumber,
        departure_time_back: this.flightDetailsData?.flights[1]?.flightSegment?.DepartureTime,
        arrival_time_back: this.flightDetailsData?.flights[1]?.flightSegment?.ArrivalTime,
        flight_time_back: this.flightDetailsData?.flights[1]?.flightSegment?.FlightTime,
        distance_back: this.flightDetailsData?.flights[1]?.flightSegment?.Distance,
        provider_code_back: this.flightDetailsData?.flights[1]?.flightSegment['air:AirAvailInfo']['ProviderCode'],
        class_service_back: this.flightDetailsData?.flights[1]?.flightSegment['air:AirAvailInfo']['ProviderCode'],
        origin_back: this.flightDetailsData?.flights[1]?.flightSegment?.Origin,
        destination_back: this.flightDetailsData?.flights[1]?.flightSegment?.Destination,
        book_code_back: bookingCode_back,
        segmentKey_back: this.flightDetailsData?.flights[1]?.flightSegment?.Key,
        fareBasis_back: this.flightDetailsData?.flights[1]?.flightSegment?.fareInfo?.FareBasis
      }

      this.getFlightPricingDetailsForRoundTrip(params);
    } else {
      // For One Way
      let Flight_Options_List = this.flightDetailsData['air:AirPricingInfo']['air:FlightOptionsList'];
      let booking_Obj_list = Flight_Options_List['air:FlightOption']['air:Option']['air:BookingInfo'];
      if (Array.isArray(booking_Obj_list)) { bookingCode = booking_Obj_list[0].BookingCode; }
      else { bookingCode = booking_Obj_list.BookingCode; }

      let params: any = {
        Carrier: this.flightDetailsData?.indexFlight?.Carrier,
        FlightNumber: this.flightDetailsData?.indexFlight?.FlightNumber,
        Origin: this.flightDetailsData?.indexFlight?.Origin,
        Destination: this.flightDetailsData?.indexFlight?.Destination,
        DepartureTime: this.flightDetailsData?.indexFlight?.DepartureTime,
        ArrivalTime: this.flightDetailsData?.indexFlight?.ArrivalTime,
        FlightTime: this.flightDetailsData?.indexFlight?.FlightTime,
        ProviderCode: this.flightDetailsData['air:AirPricingInfo']['ProviderCode'],
        Distance: this.flightDetailsData?.indexFlight?.Distance,
        segmentKey: this.flightDetailsData?.indexFlight?.Key,
        FareBasis: this.flightDetailsData?.fareInfo?.FareBasis,
        AvailabilitySource: this.flightDetailsData?.indexFlight?.AvailabilitySource,
        bookingCode: bookingCode
      }

      this.getFlightPricingDetails(params);
    }


    this.travellersDetails = {
      adults: [{},],
      childs: [{},],
      infants: [{},],
    }
  }


  is_openReviewModal: boolean = false;
  openReviewModal() {
    this.is_openReviewModal = !this.is_openReviewModal;
  }

  showDetails() {
    this.showDetailsCard = !this.showDetailsCard;
  }

  openGenderList(GenderList: any) {
    this.selectedList = GenderList
  }

  is_openAddExtraModal: boolean = false;
  openAddExtraModal() {
    this.is_openAddExtraModal = !this.is_openAddExtraModal;
  }

  is_openCancellationFeesModal: boolean = false;
  openCancellationFeesModal() {
    this.is_openCancellationFeesModal = !this.is_openCancellationFeesModal;
  }

  tabChange(index: number) {
    this.active = index;
  }

  GenderChange(gender: string) {
    this.Genderactive = gender;
  }


  getPrice(price: any) {
    let priceValue = price ? price.slice(3, price.length) : 0;
    return JSON.parse(priceValue);
  }

  seconds_to_days_hours_mins_secs_str(mins: any) {
    let h: any = Math.floor(mins / 60), m: any = mins % 60;
    h = h < 10 ? '' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}hrs ${m}mins`;
  }

  getSuffix(dateStr: any) {
    let date: any = new Date(dateStr);
    let h: any = date.getHours();
    let m: any = date.getMinutes();
    let s: any = date.getSeconds();
    return (h >= 12) ? 'PM' : 'AM';
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

  detailPageData: any = {};
  Air_Price_Rsp: any = {};
  detailPageData_AirItinerary: any = {};
  detailPageData_AirPricingSolution: any = [];
  detailPageData_ResponseMessage: any = [];

  airPriceSolutionSegment: any = {};
  getFlightPricingDetails(data: any) {
    this.flightService.flight_loader = true;
    let params: any = {
      carrier: data.Carrier,
      flightNumber: data.FlightNumber,
      origin: data.Origin,
      destination: data.Destination,
      departure_time: `${data.DepartureTime.slice(0, 10)}`,
      arrival_time: `${data.ArrivalTime.slice(0, 10)}`,
      flight_time: data.FlightTime,
      provider_code: data.ProviderCode,
      class_service: data.bookingCode,
      distance: data.Distance,
      av_source: data.AvailabilitySource,
      book_code: data.bookingCode,
      segmentKey: data.segmentKey,
      fareBasis: data.FareBasis,
      is_two_way: false,
    };

    this.apiRequestService.getFlightPricing(params).subscribe(
      res => {
        if (res.responseCode === 200 && res.data['air:AirPriceRsp'] != undefined) {
          this.detailPageData = res.data;
          console.log("res :", res.data['air:AirPriceRsp']['air:AirItinerary']['air:AirSegment'])
          this.airPriceSolutionSegment = res.data['air:AirPriceRsp']['air:AirItinerary']['air:AirSegment'];
          this.Air_Price_Rsp = res.data['air:AirPriceRsp']['air:AirPriceResult'];
          this.detailPageData_AirItinerary = this.detailPageData['air:AirPriceRsp']['air:AirItinerary']['air:AirSegment'];
          this.detailPageData_AirPricingSolution = this.detailPageData['air:AirPriceRsp']['air:AirPriceResult']['air:AirPricingSolution'];
          this.detailPageData_ResponseMessage = this.detailPageData['air:AirPriceRsp']['common_v42_0:ResponseMessage'];
          // console.log("detailPageData : ", this.detailPageData);
          // console.log("detailPageData_AirItinerary : ", this.detailPageData_AirItinerary);
          // console.log("detailPageData_AirPricingSolution : ", this.detailPageData_AirPricingSolution);
          // console.log("detailPageData_ResponseMessage : ", this.detailPageData_ResponseMessage);
          this.flight_Provider_Code = this.detailPageData_AirItinerary.ProviderCode;

          this.flightService.flight_loader = false;
        } else {
          setTimeout(() => { this.flightService.flight_loader = false; history.back() }, 10000)
        }

      }
    );
  }

  getFlightPricingDetailsForRoundTrip(data: any) {
    this.flightService.flight_loader = true;
    let params: any = {
      carrier: data.Carrier,
      flightNumber: data.FlightNumber,
      origin: data.Origin,
      destination: data.Destination,
      departure_time: `${data.DepartureTime.slice(0, 10)}`,
      arrival_time: `${data.ArrivalTime.slice(0, 10)}`,
      flight_time: data.FlightTime,
      provider_code: data.ProviderCode,
      class_service: data.bookingCode,
      distance: data.Distance,
      av_source: data.AvailabilitySource,
      book_code: data.bookingCode,
      segmentKey: data.segmentKey,
      fareBasis: data.FareBasis,
      carrier_back: data.carrier_back,
      flightNumber_back: data.flightNumber_back,
      departure_time_back: `${data.departure_time_back.slice(0, 10)}`,
      arrival_time_back: `${data.arrival_time_back.slice(0, 10)}`,
      flight_time_back: data.flight_time_back,
      distance_back: data.distance_back,
      provider_code_back: data.provider_code_back,
      class_service_back: data.class_service_back,
      origin_back: data.origin_back,
      destination_back: data.destination_back,
      book_code_back: data.book_code_back,
      segmentKey_back: data.segmentKey_back,
      fareBasis_back: data.fareBasis_back,
      is_two_way: true,
    };

    this.apiRequestService.getFlightPricing(params).subscribe(
      res => {
        if (res.responseCode === 200 && res.data['air:AirPriceRsp'] != undefined) {
          this.detailPageData = res.data;
          this.Air_Price_Rsp = res.data['air:AirPriceRsp']['air:AirPriceResult'];
          this.detailPageData_AirItinerary = this.detailPageData['air:AirPriceRsp']['air:AirItinerary']['air:AirSegment'];
          this.detailPageData_AirPricingSolution = this.detailPageData['air:AirPriceRsp']['air:AirPriceResult']['air:AirPricingSolution'];
          this.detailPageData_ResponseMessage = this.detailPageData['air:AirPriceRsp']['common_v42_0:ResponseMessage'];
          // console.log("detailPageData : ", this.detailPageData);
          // console.log("detailPageData_AirItinerary : ", this.detailPageData_AirItinerary);
          // console.log("detailPageData_AirPricingSolution : ", this.detailPageData_AirPricingSolution);
          // console.log("detailPageData_ResponseMessage : ", this.detailPageData_ResponseMessage);
          this.flight_Provider_Code = this.detailPageData_AirItinerary.ProviderCode;

          this.flightService.flight_loader = false;
        } else {
          setTimeout(() => { this.flightService.flight_loader = false; history.back() }, 10000)
        }

      }
    );
  }

  // Continue to Booking
  bookingConfirm() {
    alert("Booking Confirm successfully!");
  }


  traveller_fname: string = '';
  traveller_lname: string = '';
  traveller_mobile: string = '';
  traveller_email: string = '';
  countryCode: any;

  bookNow() {
    let travellerObj: any = {
      gender: this.Genderactive,
      fname: this.traveller_fname,
      lname: this.traveller_lname,
      mobile: this.countryCode + this.traveller_mobile,
      email: this.traveller_email
    }
  }


  show_adult_form: boolean = true;
  show_child_form: boolean = true;
  show_infant_form: boolean = true;


  travellersDetails: any = {};
  maxAdultLength: number = 2;
  maxChildLength: number = 2;
  maxInfantLength: number = 2;

  // Adults
  maxLengthAdult: boolean = false;
  addAdultForm() {
    if (this.travellersDetails.adults.length < this.maxAdultLength) {
      this.travellersDetails.adults.push({})
    } else {
      this.maxLengthAdult = true;
    }
  }

  removeAdultForm(index: number) {
    this.travellersDetails.adults.splice(index, 1);
    this.maxLengthAdult = false;
  }

  adultList: any = [];
  getAdultData(adultData: any) {
    if (adultData.is_selected) {
      this.adultList.push(adultData);
    } else {
      this.adultList.splice(adultData.index, 1);
    }

  }

  // Child
  maxLengthChild: boolean = false;
  addChildForm() {
    if (this.travellersDetails.childs.length < this.maxChildLength) {
      this.travellersDetails.childs.push({})
    } else {
      this.maxLengthChild = true;
    }
  }
  childList: any = [];
  getChildData(childData: any) {
    if (childData.is_selected) {
      this.childList.push(childData);
    } else {
      this.childList.splice(childData.index, 1);
    }

  }

  removeChildForm(index: number) {
    this.travellersDetails.childs.splice(index, 1);
    this.maxLengthChild = false;
  }

  // Infant
  maxLengthInfant: boolean = false;
  addInfantForm() {
    if (this.travellersDetails.infants.length < this.maxInfantLength) {
      this.travellersDetails.infants.push({})
    } else {
      this.maxLengthInfant = true;
    }
  }
  infantList: any = [];
  getInfantData(infantData: any) {
    if (infantData.is_selected) {
      this.infantList.push(infantData);
    } else {
      this.infantList.splice(infantData.index, 1);
    }

  }

  removeInfantForm(index: number) {
    this.travellersDetails.infants.splice(index, 1);
    this.maxLengthInfant = false;
  }


  selectedSection: any = [];
  goToNextStep(sectionId: number) {
    this.selectedSection.push(sectionId);
  }

  getContactDetails(contactDetails: any) {
    this.contactInfo = contactDetails;
    this.selectedSection.push(3);
  }
  getGSTDetails(gstDetails: any) {
    this.gstInfo = gstDetails;
  }

  contactInfo: any = {};
  gstInfo: any = {};
  travellersList: any = [];

  travellers_error_str: string = '';

  is_booking_confirm: boolean = false;

  getFlightBooking() {
    let DeliveryInfo = {
      ShippingAddress: {
        Street: this.street,
        City: this.city ? this.city : 'Udaipur',
        State: this.state ? this.state : 'RJ',
        PostalCode: this.PostalCode,
        Country: this.country ? this.country : 'India',
        _Key: "QkttSVNSMzlUeEpGbDkwRA=="
      }
    };
    if (this.adultList.length >= 1) {
      this.adultList.forEach((adult: any, index: number) => {
        let BookingTraveler: any = { ...this.getTravellerDetails(adult), ...(index === 0 && { DeliveryInfo: DeliveryInfo }) };
        this.travellersList.push({ BookingTraveler });
      });
    }
    if (this.childList.length >= 1) {
      this.childList.forEach((child: any, index: number) => {
        let BookingTraveler: any = { ...this.getTravellerDetails(child), ...(index === 0 && { DeliveryInfo: DeliveryInfo }) };
        this.travellersList.push({ BookingTraveler });
      });
    }
    if (this.infantList.length >= 1) {
      this.infantList.forEach((infant: any, index: number) => {
        let BookingTraveler: any = { ...this.getTravellerDetails(infant), ...(index === 0 && { DeliveryInfo: DeliveryInfo }) };
        this.travellersList.push({ BookingTraveler });
      });
    }

    if (this.travellersList.length === 0) {
      this.travellers_error_str = 'Please select the travellers';
    } else if (this.traveller_mobile_number === '') {
      this.travellers_error_str = 'Please enter mobile number';
    } else if (this.traveller_email_adress === '') {
      this.travellers_error_str = 'Please enter email address';
    } else {
      this.travellers_error_str = '';
      // console.log("travellers", this.travellersList[0].DeliveryInfo);
      // console.log("travellers", this.travellersList);

      this.flightService.flight_loader = true;
      setTimeout(() => {
        this.flightService.flight_loader = false;
        this.is_booking_confirm = true;
      }, 2000);
      this.generate_Ticket_PNR();
    }

  }

  generate_Ticket_PNR() {
    // let totalPrice:string = this.searchQueryParams.is_two_way ? this.flightDetailsData.TotalPrice : this.flightDetailsData.
    this.apiRequestService.generate_Ticket_PNR(this.travellersList, { AirPricingSolution: {...this.Air_Price_Rsp['air:AirPricingSolution'][0], AirSegment:this.airPriceSolutionSegment} }, this.flight_Provider_Code, this.flightDetailsData.TotalPrice).subscribe(
      res => {
        console.log("Flight Booking Generate :", res);
        // window.location.reload();
      }
    );
  }

  getTravellerDetails(traveller: any) {
    let bookingData = {
      BookingTravelerName: {
        _Prefix: traveller._Prefix,
        _First: traveller._First,
        _Last: traveller._Last
      },
      PhoneNumber: {
        _Location: "DEN",
        _CountryCode: this.traveller_country_code,
        _AreaCode: "303",
        _Number: this.traveller_mobile_number
      },
      Email: {
        _EmailID: this.traveller_email_adress
      },
      SSR: {
        _Type: "DOCS",
        _FreeText: "P/GB/S12345678/GB/20JUL76/M/01JAN16/SMITH/JOHN",
        _Carrier: this.flightDetailsData.indexFlight.Carrier
      },
      Address: {
        AddressName: "DemoSiteAddress",
        Street: this.street,
        City: this.city ? this.city : 'Udaipur',
        State: this.state ? this.state : 'RJ',
        PostalCode: this.PostalCode,
        Country: this.country ? this.country : 'India'
      },
      _xmlns: "http://www.travelport.com/schema/common_v42_0",
      _Key: "QkttSVNSMzlUeEpGbDkwRA==",
      _TravelerType: traveller._TravelerType,
      _Age: traveller._Age,
      _DOB: traveller._DOB,
      _Gender: traveller._Gender,
      _Nationality: traveller._Nationality
    };
    return bookingData;
  }

  traveller_country_code: string = '91';
  get_traveller_country_code(countryCode: string) {
    this.traveller_country_code = countryCode;
  }
  traveller_mobile_number: string = '';
  get_traveller_mobile_number(mobileNumber: string) {
    this.traveller_mobile_number = mobileNumber;
  }
  traveller_email_adress: string = '';
  get_traveller_email_adress(emailAddress: string) {
    this.traveller_email_adress = emailAddress;
  }
  company_name: string = '';
  get_company_name(companyName: string) {
    this.company_name = companyName;
  }
  registration_no: string = '';
  get_registration_no(registrationNo: string) {
    this.registration_no = registrationNo;
  }
  street: string = '';
  get_street(street: string) {
    this.street = street;
  }
  state: string = '';
  get_State(state: string) {
    this.state = state;
  }
  city: string = '';
  get_City(city: string) {
    this.city = city;
  }
  country: string = '';
  get_Country(country: string) {
    this.country = country;
  }
  PostalCode: string = '';
  get_PostalCode(PostalCode: string) {
    this.PostalCode = PostalCode;
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



}