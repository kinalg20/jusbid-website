import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { CommonService } from 'src/app/modules/core/services/common.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent {
  constructor(
    private router: Router,
    private _api: ApiService,
    public _commonService: CommonService
  ) {}

  public ShowForm: string = 'signin';
  public UserData: any = {};
  public OTPCheck: any = '';

  sendOTP: boolean = false;
  reqPhoneNo: string = '';
  userOTP: string = '';
  password: string = '';
  confirmPassword: string = '';
  resMsg: string = '';
  resSignupMsg: string = '';
  disableMobile: boolean = true;
  hidePassword: boolean = true;
  otp: any;
  invalidEmail = false;
  invalidMobile = false;
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  signinWithEmail(form: NgForm) {
    let apiURL = `/front-user-login`;
    //let apiURL = `/front-user-customer-login`;
    let data = Object.assign({}, form.value);
    let loginobj = {
      user: data.user,
      password: data.password,
    };

    this._api.post(apiURL, loginobj).subscribe(
      (res) => {
        if (
          res.responseCode === 200 &&
          (res.data.role === 6 || res.data.role === 4)
        ) {
          if (res.data.status === 'Blocked') {
            this.resMsg = "Sorry you can't login! You are Blocked from Admin.";
          }
          
          else {
            localStorage.setItem(
              'jusbid_front_user_cred',
              JSON.stringify(res.data)
            );
            localStorage.setItem(
              'userToken',
              JSON.stringify(res.data.userToken)
            );
            window.history.back();
          }
        }
        
        else {
          this.resMsg = res.msg;
          localStorage.removeItem('jusbid_front_user_cred');
        }
      },
      () => {
        form.reset();
      }
    );
  }

  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  loginWithPhoneNumber() {
    let apiURL = `/otp-login`;
    this.sendOTP = true;

    if (this.reqPhoneNo.toString().length >= 10) {
      this._api.post(apiURL, { mobile: this.reqPhoneNo }).subscribe((res) => {
        if (res.responseCode == 200) {
          this.UserData = res.data.userdata;
          this.OTPCheck = res.data.datakey - 121212;
        }
      });
    }
    
    else {
      this.resMsg = 'Please enter your valid mobile number';
    }
  }

  verifyOTP() {
    if (this.userOTP == this.OTPCheck) {
      localStorage.setItem(
        'jusbid_front_user_cred',
        JSON.stringify(this.UserData)
      );
      window.history.back();
    }
    
    else {
      alert('OTP is not valid');
    }
  }

  signUp(form: NgForm) {
    let apiURL = `/create-front-user`;
    let data = Object.assign({}, form.value);
    let userObj = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    };

    this._api.post(apiURL, userObj).subscribe(
      (res) => {
        if (res.responseCode == 200) {
          localStorage.setItem(
            'jusbid_front_user_cred',
            JSON.stringify(res.data)
          );
          this.router.navigateByUrl('/');
        }
        
        else {
          this.resSignupMsg = res.msg;
          localStorage.removeItem('jusbid_front_user_cred');
        }
      },
      () => {
        form.reset();
      }
    );
  }

  onOtpChange(otp: any) {
    this.userOTP = otp;
  }

  enableButton(event: any) {
    if (event.target.value.length === 10) {
      this.disableMobile = false;
    }
    
    else {
      this.disableMobile = true;
    }
  }

  maxlengthMobile(event: any) {
    if (
      /^[0-9]$/.test(event.key) &&
      /^[0-9]*$/.test(event.target.value) &&
      event.target.value.length === 10
    ) {
      event.preventDefault();
    }
  }

  inputMobile(event: any) {
    if (
      event.key.length === 1 &&
      !/^[0-9]$/.test(event.key)
    ) {
      event.preventDefault();
    }
  }

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

  validateEmail(event: any) {
    const value = event.target.value;

    if (
      value &&
      !/^[0-9]*$/.test(value) &&
      !this._commonService.validateEmail(event)
    ) {
      this.invalidEmail = true;
    }

    else {
      this.invalidEmail = false;
    }
  }
}
