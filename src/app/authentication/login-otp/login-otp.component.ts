import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/core/services/api-requests.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent implements OnInit {
  sendOTP: boolean = false;
  disableMobile: boolean = true;
  reqPhoneNo: string = '';
  userOTP: string = '';
  OTPCheck: any = '';
  UserData: any = {};
  resMsg : string = '';
  constructor(
    public _utilsService: UtilsService,
    private _apiReqService: ApiRequestService,
  ) { }

  ngOnInit(): void {
  }



  //login to Phone number
  loginWithPhoneNumber() {
    this.sendOTP = true;
    if (this.reqPhoneNo.toString().length >= 10) {
      this._apiReqService.GetOtpLogin({ mobile: this.reqPhoneNo }).subscribe(
        (res) => {
          if (res.responseCode == 200) {
            // userdata is show all details 
            this.UserData = res.data.userdata;
            //data key is generate a number , subtract 121212 to that  generated number and then after subtracted number send as Otp
            this.OTPCheck = res.data.datakey - 121212;
          }
          else {
            this.resMsg = 'Please enter your valid mobile number';
          }
        }
      );
     
    }
  }

  //  number is upto 10 then show enable button
  enableButton(event: any) {
    if (event.target.value.length === 10) {
      this.disableMobile = false;
    }
    else {
      this.disableMobile = true;
    }
  }


  // for change otp 
  onOtpChange(otp: any) {
    this.userOTP = otp;
  }


  //check verifyOTP
  verifyOTP() {
    if (this.userOTP == this.OTPCheck) {
      localStorage.setItem(
        'userData',
        JSON.stringify(this.UserData)
      );
      window.history.back();
    }
    else {
      alert('OTP is not valid');
    }
  }
}
