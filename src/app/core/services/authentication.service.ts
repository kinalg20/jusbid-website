import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public _api: ApiService,
    private router: Router,
  ) { }

  // Create front user
  CreateUser(params: any) {
    // {
    //   "firstname":"khushal",
    //   "lastname":"yadav",
    //   "email":"khushal.cornice@gmail.com",
    //   "mobile":"9785558507",
    //   "password":"12345" 
    // }
    let apiURL: string = `/create-front-user`;
    return this._api.post(apiURL, params);
  }

  // Resend password
  ResendPassword(params: any) {
    // {
    //   "email": "someone@example.com"
    // }
    let apiURL: string = `/user-resend-email`;
    return this._api.post(apiURL, params);
  }

  // Change password
  ChangePassword(params: any) {
    // { 
    //   "current_password": "123456" , 
    //   "userId":"khushal@12",
    //   "new_password": "12345678"   
    // }
    let apiURL: string = `/change-password`;
    return this._api.post(apiURL, params);
  }

  // User login
  UserLogin(params: any) {
    // {
    //   "user": "khushal.cornice@gmail.com", 
    //   "password":"12345"
    // }
    let apiURL: string = `/front-user-login`;
    return this._api.post(apiURL, params);
  }

  // OTP login
  OTPLogin(params: any) {
    // {
    //   "mobile": "1234567890"
    // }
    let apiURL: string = `/otp-login`;
    return this._api.post(apiURL, params);
  }

  // User logout
  UserLogout() {
    let localStorageData = localStorage.getItem('userId');
    if (localStorageData) {
      localStorage.removeItem('userId');
    }
    this.router.navigateByUrl('/auth');
  }

}
