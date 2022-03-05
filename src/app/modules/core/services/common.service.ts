import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

import * as moment from 'moment';


@Injectable()
export class CommonService {

    constructor(
        private _api: ApiService,
        private router: Router
    ) { }

    success_msg: any = '';
    error_msg: any = '';
    is_app_loading: boolean = false;
    is_list_load: boolean = false;
    successAlert: boolean = false;
    errorAlert: boolean = false;

    getLogedinUserData() {
        let jusbid_front_user_cred = localStorage.getItem("jusbid_front_user_cred");
        if (jusbid_front_user_cred) {
            return JSON.parse(jusbid_front_user_cred);
        } else {
            return {
                userId: "11041998",
                firstname: "Jusbid",
                lastname: "User",
            };
        }
    }

    isAuthenticated() {
        let user_data = localStorage.getItem("jusbid_front_user_cred");
        if (user_data) {
            let user_all_data = JSON.parse(user_data);
            if (user_all_data.role === 6 || user_all_data.role === 4) {
                return true;
            }
        }
        return false;
    }

    getUserIPAdress() {
        return this._api.get('https://jsonip.com/');
    }

    logOut() {
        if (this.isAuthenticated()) {
            localStorage.removeItem("jusbid_front_user_cred");
            this.router.navigateByUrl('/auth');
        }
    }
  
    showAlertBox(msg?: string, type?: string) {
        if (type == 'success') {
            this.successAlert = true;
            this.success_msg = msg;
            setTimeout(() => {
                this.successAlert = false;
            }, 3000);
        }
        else if (type == 'error') {
            // console.log("Error", msg)
            this.errorAlert = true;
            this.error_msg = msg;
            setTimeout(() => {
                this.errorAlert = false;
            }, 6000);
        }
    }

    invalidEmail: string = '';
    validateEmail(email: any) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email.target.value) == false) {
            this.invalidEmail = 'Invalid Email Address';
            return false;
          }
          this.invalidEmail = '';
          return true;
        }


    fromNowDate(date: any) {
        return moment(date).fromNow();
    }


}

