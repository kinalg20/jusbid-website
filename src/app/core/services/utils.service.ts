import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  map_api_key: string = '';

  constructor() {
    this.map_api_key = environment.mapApiKey;
  }

  // Validations
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email !== '' ? re.test(email) : false;

  }

  // check the length of moblie number
  maxlengthMobile(event: any) {
    if (
      /^[0-9]$/.test(event.key) &&
      /^[0-9]*$/.test(event.target.value) &&
      event.target.value.length === 10
    ) {
      event.preventDefault();
    }
  }

  // check mubile is vaild 
  inputMobile(event: any) {
    if (
      event.key.length === 1 &&
      !/^[0-9]$/.test(event.key)
    ) {
      event.preventDefault();
    }
  }

  // check validection of mobile number
  invalidMobile: boolean = false;
  validateMobile(event: any) {
    const value = event.target.value;

    if (
      value &&
      /^[0-9]+$/.test(value) &&
      value.length < 10
    ) {
      this.invalidMobile = true;
    }

    else {
      this.invalidMobile = false;
    }
  }

  // check email is vaild 
  invalidEmail: boolean = false;
  validatedEmail(event: any) {
    const value = event.target.value;
    if (
      value &&
      !/^[0-9]*$/.test(value) &&
      !this.validateEmail(event)
    ) {
      this.invalidEmail = true;
    }

    else {
      this.invalidEmail = false;
    }
  }


  // LocalSorage
  setLocalStorageData(key: string, data: string) {
    localStorage.setItem(key, data);
    return
  }

  getLocalStorageData(key: string) {
    let lclStrData = localStorage.getItem(key);
    if (lclStrData) {
      let data = JSON.parse(lclStrData);
      return data;
    }
    return {};
  }

  clearLocalStorgaeData() {
    localStorage.clear();
  }

  goBack() {
    window.history.back();
  }

  fromNowDate(date: any) {
    return moment(date).fromNow();
  }

  // Google Map Location
  customerLocation: any;
  customerLatitude: any;
  customerLongitude: any;
  getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request: any = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          if (result != null) {
            console.log("Adddres:", result);
            this.customerLocation = result.formatted_address;
          } else {
            alert("No address available!");
          }
        }
      });
    }
    return this.customerLocation;
  }

  getMyCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.customerLatitude = position.coords.latitude;
        this.customerLongitude = position.coords.longitude;
        this.getGeoLocation(this.customerLatitude, this.customerLongitude);
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }


}
