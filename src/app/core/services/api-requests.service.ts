
import {
    Injectable
} from '@angular/core';
import {
    Router
} from '@angular/router';

import {
    ApiService
} from './api.service';

@Injectable()
export class ApiRequestService {
    public customer_id: string = '';
    public customerDetails: any;
    constructor(
        public _api: ApiService,
        private router: Router,) {
        let localStorageData = localStorage.getItem('userId');
        if (localStorageData) {
            this.customer_id = JSON.parse(localStorageData);
        }

    }
    Get_My_IP_Adress() {
        return this._api.get('https://jsonip.com/');
    }
    // get user profile
    GetUserProfile(params: any) {
        // {
        //     "userId": "guso3599"
        // }
        let apiURL: string = `/get-user-profile`;
        return this._api.post(apiURL, params);
    }
    // get user notification
    GetUserNotification(params: any) {
        // {
        //     "userId": "guso3599"
        // }
        let apiURL: string = `/get-user-notification`;
        return this._api.post(apiURL, params);
    }
    // get popular hotels
    GetPopularHotels() {
        let apiURL: string = `/get-popular-hotels`;
        return this._api.get(apiURL);
    }
    // get city name
    GetCityName(params: any) {
        // {
        //   "lat": "24.5854",
        //   "long": "73.7125"
        // }
        let apiURL: string = `/get-applanding-data`;
        return this._api.post(apiURL, params);
    }
    // get states
    GetStates() {
        let apiURL: string = `/get-states`;
        return this._api.get(apiURL);
    }
    // get cities
    GetCities() {
        let apiURL: string = `/get-cities`;
        return this._api.get(apiURL);
    }
    // save queries for bulk booking
    SaveQueries(params: any) {
        // {
        //   "userId": "hash440",
        //   "email": "user@example.com",
        //   "mobile": "1234567890",
        //   "subject": "booking",
        //   "content": "12",
        //   "startdate": "12/16/2021",
        //   "enddate": "12/22/2021",
        //   "persons": 100,
        // }
        let apiURL: string = `/save-query`;
        return this._api.post(apiURL, params);
    }
    // search hotels (home page)
    SearchHotels(params: any) {
        // {
        //   "arrival": "14-12-2021",
        //   "city": "Udaipur",
        //   "departure": "15-12-2021",
        //   "guestNo": "1",
        //   "lat": "24.585445",
        //   "long": "73.712479",
        //   "rooms": "1",
        //   "state": "Rajasthan"
        // }
        let apiURL: string = `/home-search-new`;
        return this._api.post(apiURL, params);
    }
    // get hotel categories
    GetHotelCategories() {
        let apiURL: string = `/get-hotel-categories`;
        return this._api.get(apiURL);
    }
    // get all amenities
    GetAllAmenities() {
        let apiURL: string = `/get-amenities`;
        return this._api.get(apiURL);
    }
    // get user bids
    GetUserBids(params: any) {
        // {
        //   "userId": "guso3599"
        // }
        let apiURL: string = `/get-user-bids`;
        return this._api.post(apiURL, params);
    }
    // get hotel details with recommended hotels
    GetHotelDetails(params: any) {
        // {
        //   "hotel_id": "hash",
        //   "latitude": "24.56",
        //   "longitude": "73.63"
        // }
        let apiURL: string = `/get-hotel-details`;
        return this._api.post(apiURL, params);
    }
    // get hotel ratings
    GetHotelRatings(params: any) {
        // {
        //   "hotel_id": "hash"
        // }
        let apiURL: string = `/get-hotel-ratings`;
        return this._api.post(apiURL, params);
    }
    // search hotel name (home page)
    SearchHotelName(params: any) {
        // {
        //   "city": "Udaipur",
        //   "hotel_name": "Fateh Garh By Fateh Collection"
        // }
        let apiURL: string = `/search-by-hotelname`;
        return this._api.post(apiURL, params);
    }
    // filter hotel search data
    FilterHotel(params: any) {
        // {
        //   "rangeMax": "0",
        //   "rangeMin": "10000",
        //   "selectedAmenity": "",
        //   "selectedRoomAmenity": "",
        //   "selectedCategory": "",
        //   "city": "Udaipur",
        //   "lat": "24.58",
        //   "long": "73.71"
        // }
        let apiURL: string = `/filter-hotels`;
        return this._api.post(apiURL, params);
    }
    // get hotel addon
    GetHotelAddon(params: any) {
        // {
        //   "hotel_id": "hash"
        // }
        let apiURL: string = `/get-hotel-addon`;
        return this._api.post(apiURL, params);
    }
    // get room amenities
    GetRoomAmenities() {
        let apiURL: string = `/get-room-amenities`;
        return this._api.get(apiURL);
    }
    // generate payment order request
    GeneratePaymentOrderRequest(params: any) {
        // {
        //   "bid_id": "hash",
        //   "amount": "10000"
        // }
        let apiURL: string = `/generate-order-rzp`;
        return this._api.post(apiURL, params);
    }
    // update booking info using bid id
    UpdateBookingInfo(params: any) {
        // {
        //   "bid_id": "hash",
        //   "taxClass", "12",
        //   "add_on": []
        // }
        let apiURL: string = `/update-booking-info-by-bidid`;
        return this._api.post(apiURL, params);
    }
    // save payment record
    SavePaymentRecord(params: any) {
        // { 
        //   "userId": "hash17", 
        //   "username": "harshita  shrimali" , 
        //   "bid_id": "6167cd9708f075581c8061ba", 
        //   "hotel_id": "6149ad0102b5cb3c954efc59", 
        //   "hotel_name": "JusBid",
        //   "amount": "5",
        //   "rzp_payment_id": "", 
        //   "rzp_order_id": "",
        //   "rzp_signature": "" 
        // }
        let apiURL: string = `/app-payment`;
        return this._api.post(apiURL, params);
    }
    // get hotel by id
    GetHotelById(params: any) {
        // {
        //   "id": "hash"
        // }
        let apiURL: string = `/get-hotels-byid`;
        return this._api.post(apiURL, params);
    }
    // get user booking
    GetUserBooking(params: any) {
        // {
        //   "userId": "hash"
        // }
        let apiURL: string = `/get-user-booking`;
        return this._api.post(apiURL, params);
    }
    // get all customers
    GetAllCustomers(params: any) {
        // {
        //   "userId": "hash"
        // }
        let apiURL: string = `/get-my-customers`;
        return this._api.post(apiURL, params);
    }
    // save user rating
    SaveUserRating(params: any) {
        // {
        //   "hotel_id":"6149ad0102b5cb3c954efc59",
        //   "userId":"hash17",
        //   "booking_id":"" , 
        //   "value":"4", 
        //   "location":"3",
        //   "clean":"2", 
        //   "service":"3"  ,
        //   "feedback":"Great!"
        // }
        let apiURL: string = `/save-rating`;
        return this._api.post(apiURL, params);
    }
    // cancel user booking
    CancelUserBooking(params: any) {
        // {
        //   "booking_id": ""
        // }
        let apiURL: string = `/cancel-my-booking`;
        return this._api.post(apiURL, params);
    }
    // remove a customer record
    RemoveCustomerRecord(params: any) {
        // {
        //   "customer_id": ""
        // }
        let apiURL: string = `/remove-custom`;
        return this._api.post(apiURL, params);
    }
    // save travel agent customer
    SaveTravelAgentCustomer(params: any) {
        // {
        //   "userId":"hash17",
        //   "name":"harshita", 
        //   "email":"harshita@gmail.com" ,
        //   "contact":"1234567890", 
        //   "address":"Shrimali colony udaipur"
        // }
        let apiURL: string = `/customer`;
        return this._api.post(apiURL, params);
    }
    // update travel agent customer
    UpdateTravelAgentCustomer(params: any) {
        // {
        //   "userId":"hash17",
        //   "name":"harshita", 
        //   "email":"harshita@gmail.com" ,
        //   "contact":"1234567890", 
        //   "address":"Shrimali colony udaipur",
        //   "customer_id":"61b98faa185a512c8cf5ddd2"
        // }
        let apiURL: string = `/customer`;
        return this._api.put(apiURL, params);
    }
    // set profile image
    SetProfileImage(params: any) {
        // {
        //   "userId":"hash17",
        //   "profile_img": "https://jusbid.in:1337/images/profile/2021/11/22/3ae5598c-d574-4b02-9b50-2c62f5f14942.webp"
        // }
        let apiURL: string = `/set-profile-img`;
        return this._api.post(apiURL, params);
    }
    // update user by id
    UpdateUser(params: any) {
        // {
        //   "userId": "KhYa9" ,
        //   "firstname":"khushal",
        //   "lastname":"yadav",
        //   "email":"khushal.cornice@gmail.com,",
        //   "mobile":"9785558507",
        //   "password":"12345", 
        //   "role":"2"
        // }
        let apiURL: string = `/update-user-byid`;
        return this._api.post(apiURL, params);
    }
    // create agent request
    CreateAgentRequest(params: any) {
        // { 
        //   "company_name": "Travlex PVT LTD", 
        //   "agent_name":"harshita ",
        //   "email": "harshita@gmail.com", 
        //   "contact_no":"9876543210",
        //   "landline": "24567890", 
        //   "address":"xyz colony", 
        //   "zip":"313001", 
        //   "city":"udaipur", 
        //   "state":"Rajasthan", 
        //   "country":"India", 
        //   "address":"up", 
        //   "area":"badgoan"
        // }
        let apiURL: string = `/create-front-user`;
        return this._api.post(apiURL, params);
    }
    // add hotel request
    AddHotelRequest(params: any) {
        // {
        //   "name":"harshita shrimali", 
        //   "plot_no":"12345", 
        //   "address":"badgoan", 
        //   "landmark":"", 
        //   "city":"udaipur", 
        //   "state":"rajasthan", 
        //   "email":"harshita@gmail.com", 
        //   "contact":"1234567890" 
        // }
        let apiURL: string = `/create-hotel-request`;
        return this._api.post(apiURL, params);
    }
    GetFrontUserLogin(params : any){
        // {
        //     "user": "khushal.cornice@gmail.com", 
        //     "password":"12345"
        // }
        let apiURL : string = '/front-user-login'
        return this._api.post(apiURL, params)
    }
    GetOtpLogin(params : any){
        // {
        //     "mobile":"9786325412"
        // }
        let apiURL : string = "/otp-login"
        return this._api.post(apiURL, params)
    }
    userResendEmail(params : any){
        // { 
        //     "email" : "harshitashrimali03@gmail.com"
        // } 
        let apiURL : string = "/user-resend-email"
        return this._api.post(apiURL, params)
    }
}