import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiRequestService } from 'src/app/core/services/api-requests.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resMsg: string = '';
  isError: boolean = false;


  constructor(
    public _apiReqService: ApiRequestService,
    public _utlisService: UtilsService
  ) { }

  ngOnInit(): void {
  }


  //resend password on email 
  userResendEmail(form: NgForm) {
    let data = Object.assign({}, form.value);
    this._apiReqService.userResendEmail({ email: data.email }).subscribe(
      res => {
        this.resMsg = res.msg;
        if (res.responseCode == 200) {
          this.isError = false;
        }
        else {
          this.isError = true;
        }
        setTimeout(() => {
          this.resMsg = '';
          form.reset();
        }, 3000);
      }
    );
  }

  //  disable button when put a correct email
  disableForgotPassword: boolean = true;
  enableButton(event: any) {
    if (this._utlisService.validateEmail(event)) {
      this.disableForgotPassword = false;
    }
    else {
      this.disableForgotPassword = true;
    }
  }

}
