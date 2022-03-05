import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ApiRequestService } from '../../core/services/api-requests.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  resMsg: string = '';
  invalidEmail :boolean = false;
  invalidMobile :boolean = false

  constructor(
    private _apiReqService: ApiRequestService,
    public _utilsService : UtilsService
  ) { }

  ngOnInit(): void {
  }

  // user login with email and password  

  signinWithEmail(form: NgForm) {
    let data = Object.assign({}, form.value);
    let loginobj = {
      user: data.user,
      password: data.password,
    };
    this._apiReqService.GetFrontUserLogin(loginobj).subscribe(
      (res) => {
        // if admin blocked any user they can login 
        if (
          res.responseCode === 200 &&
          (res.data.role === 6 || res.data.role === 4)
        ) {
          if (res.data.status === 'Blocked') {
            this.resMsg = "Sorry you can't login! You are Blocked from Admin.";
          }
          // login details set on localStorage 
          else {
            localStorage.setItem(
              'userData',
              JSON.stringify(res.data)
            );

            // login user token  set on localStorage 
            localStorage.setItem(
              'userToken',
              JSON.stringify(res.data.userToken)
            );
            window.history.back();
          }
        }
        //remove login credentials
        else {
          this.resMsg = res.msg;
          localStorage.removeItem('userData');
        }
        // console.log("login", res)
      },
    )
  }


  hidePassword : boolean = true;
  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

}
