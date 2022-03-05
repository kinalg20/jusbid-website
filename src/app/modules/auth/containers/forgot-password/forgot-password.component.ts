import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { CommonService } from 'src/app/modules/core/services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(
    private _api: ApiService,
    private commonService: CommonService,
  ) {}

  resMsg: string = '';
  isError: boolean = false;
  disableForgotPassword = true;

  userResendEmail(form: NgForm) {
    let data = Object.assign({}, form.value);
    let apiURL: string = `/user-resend-email`;
    
    this._api.post(apiURL, { email: data.email }).subscribe(
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

  enableButton(event: any) {
    if (this.commonService.validateEmail(event)) {
      this.disableForgotPassword = false;
    }

    else {
      this.disableForgotPassword = true;
    }
  }

}
