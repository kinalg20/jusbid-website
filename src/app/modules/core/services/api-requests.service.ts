import { DatePipe } from '@angular/common';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CommonService } from './common.service';

function _window(): any {
    // return the global native browser window object
    return window;
}
@Injectable()
export class ApiRequestService {


    flightDetailPage: any = {};

    assets_api_URL:string='';
    base_api_URL:string='';

    get nativeWindow(): any {
        return _window();
    }
    constructor(
        public _api: ApiService,
        private _commonService: CommonService,
        public datepipe: DatePipe,
        private http: HttpClient
    ) { 
        this.assets_api_URL = this._api.asseturl;
        this.base_api_URL = this._api._baseurl;
     }


    setDetailPageData(data: any) {
        localStorage.setItem('JUSBID_Flight_Detail_Page_DATA', JSON.stringify(data));
        this.flightDetailPage = data;
    }

    getDetailPageData() {
        let localStorageData = localStorage.getItem('JUSBID_Flight_Detail_Page_DATA');

        if (localStorageData) {
            this.flightDetailPage = JSON.parse(localStorageData);
            return JSON.parse(localStorageData);
        }
    }

    getAbsolutePath(path: string) {
        return this._api._baseurl + path;
    }
    getAbsoluteImagePath(path: string) {
        return this._api.asseturl + path;
    }

    getUserId() {
        return this._commonService.getLogedinUserData().userId;
    }

    getUserInformationsByUid(uid: string) {
        let apiURL = `/get-user-profile`;
        return this._api.post(apiURL, { userId: uid });
    }

    getMyBookings(uid: string) {
        let apiURL = `/get-user-bookings`;
        return this._api.post(apiURL, { userId: uid });
    }

    getMyBidings(uid: string) {
        let apiURL = `/get-user-bids`;
        return this._api.post(apiURL, { userId: uid });
    }

    saveUserProfileImg(data: any) {
        let apiURL = `/set-profile-img`;
        return this._api.post(apiURL, data);
    }

    updateUser(data: any) {
        let apiURL = `/update-user-byid`;
        return this._api.put(apiURL, data);
    }

    resetPassword(data: any) {
        let apiURL = `/change-password`;
        return this._api.post(apiURL, data);
    }

    getAllAmenities() {
        let apiURL = `/get-amenities`;
        return this._api.get(apiURL);
    }

    get_hotel_by_hotelId(hotelID: string) {
        let url = '/get-hotels-byid';
        return this._api.post(url, { id: hotelID });
    }

    getPopular() {
        let apiURL = `/get-popular-hotels`;
        return this._api.get(apiURL);
    }

    createHotel(data: any) {
        let apiUrl = `/create-hotel-request`;
        return this._api.post(apiUrl, data);
    }

    bulkEnquiry(data: any) {
        let apiUrl = `/save-query`;
        return this._api.post(apiUrl, data);
    }

    createTravel(data: any) {
        let apiUrl = `/create-agent-request`;
        return this._api.post(apiUrl, data);
    }

    getStates() {
        let apiUrl = `/get-states`;
        return this._api.get(apiUrl);
    }

    getCities() {
        let apiUrl = `/get-cities`;
        return this._api.get(apiUrl);
    }

    getMyTravelAgentsCustomers(uid: string) {
        let apiUrl = `/get-my-customers`;
        return this._api.post(apiUrl, { userId: uid });
    }

    createMyTravelAgentsCustomers(data: any) {
        let apiUrl = `/customer`;
        return this._api.post(apiUrl, data);
    }

    editMyTravelAgentsCustomers(data: any) {
        let apiUrl = `/customer`;
        return this._api.put(apiUrl, data);
    }

    removeMyTravelAgentsCustomers(customerId: string) {
        let apiUrl = `/remove-customer`;
        return this._api.post(apiUrl, { customer_id: customerId });
    }

    bookingCustomerDetails(data: any) {
        let apiUrl = `/booking-customer-details`;
        return this._api.put(apiUrl, data);
    }
    // getFilterCities() {
    //     let citiesUrl = `/get-filter-cities`;
    //     return this._api.get(citiesUrl);
    // }
    getFilterCities(data: any) {
        let citiesUrl = `/get-applanding-data`;
        return this._api.post(citiesUrl, data);
    }
    setHotelBooking(city: string, rooms?: number, guestNo?: number, arrival?: any, departure?: any, lat?: number, lng?: number) {
        var d = new Date(Date.now())
        d.setDate(d.getDate() + 1)
        let searchData = {
            city: city,
            rooms: rooms ? rooms : 1,
            guestNo: guestNo ? guestNo : 1,
            arrival: arrival ? arrival : this.datepipe.transform(Date.now(), 'MM-dd-yyy'),
            departure: departure ? departure : this.datepipe.transform(Date.now(), `MM-${d.getDate()}-yyy`),
            lat: lat ? lat : null,
            long: lng ? lng : null,
        }
        localStorage.setItem("recent_booking", JSON.stringify(searchData));
    }
    
    upload(data: any) {
        let apiUrl = this._api._baseurl + `/raise-hotel-complaint`;
        return this.http.post<any>(apiUrl, data, { reportProgress: true, observe: 'events' });
    }
    getUserNotification(uid: any) {
        let apiUrl = `/get-frontuser-notifications`;
        return this._api.post(apiUrl, { userId: uid });
    }
    getTravelAgentBooking(uid: any) {
        let apiUrl = `/get-agent-bookings`;
        return this._api.post(apiUrl, { userId: uid, start_date: "", end_date: "" });
    }
    getTravelAgentCommission(uid: any) {
        let apiUrl = `/get-user-list`;
        return this._api.post(apiUrl, { userId: uid, roleId: 4 });
    }
    getBDEList(uid: any) {
        let apiUrl = `/get-user-list`;
        return this._api.post(apiUrl, { userId: uid, roleId: 3 });
    }
    getBidFrom(params:any) {
        let apiURL = '/bid-enquiry';
        return this._api.post(apiURL, params)
       }
    // Flight API

    getAirPorts() {
        let apiUrl = `/airports`;
        return this._api.get(apiUrl);
    }

    searchFlights(params: any) {
        let apiUrl = `/search-flight`;
        return this._api.post(apiUrl, params);
    }

    getAirlines() {
        let apiUrl = `/airlines`;
        return this._api.get(apiUrl);
    }

    getFlightPricing(params: any) {
        let apiUrl = `/flight-pricing`;
        return this._api.post(apiUrl, params);
    }

    // /ticket-pnr-generation
    generate_Ticket_PNR(TravellerData: any, AirPricingResData: any, ProviderCode: string, Amount: string) {
        let apiUrl = `/ticket-pnr-generation`;
        let params = {
            TravellerData,
            AirPricingResData,
            ProviderCode,
            Amount
        };
        return this._api.post(apiUrl, params);
    }

    // /capture-flight-booking
    capture_Flight_Booking(userId: string, username: string, transactionId: string, pnr: string, paymentId: string, flightCost: string, departure: string, arrival: string, journeyDate: string, airlines: string, serviceclass: string) {
        let apiUrl = `/capture-flight-booking`;
        let params = {
            userId,
            username,
            transactionId,
            pnr,
            paymentId,
            flightCost,
            class: serviceclass,
            departure,
            arrival,
            journeyDate,
            airlines,
        };
        return this._api.post(apiUrl, params);
    }


    searchHotel(city: string, hotel_name: string) {
        let apiUrl = `/search-by-hotelname`;
        let params = {
            city,
            hotel_name,
        };
        return this._api.post(apiUrl, params);
    }

}

