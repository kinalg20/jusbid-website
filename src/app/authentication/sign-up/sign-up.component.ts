import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/core/services/api-requests.service';
import { UtilsService } from 'src/app/core/services/utils.service';




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  resMsg : string = '';

  constructor(
    private _apiReqService: ApiRequestService,
    public router : Router,
    public _utilsService : UtilsService
  ) { }

  ngOnInit(): void {
  }

 // user register function
  SignUp(form: NgForm) {
    let data = Object.assign({}, form.value);
    let userObj = {
      firstname: data.firstname.trim(),
      lastname: data.lastname,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    };
    this._apiReqService.CreateAgentRequest(userObj).subscribe(
      (res) => {
        if (res.responseCode == 200) {
          localStorage.setItem(
            'userId',
            JSON.stringify(res.data.userId)
          );
          this.router.navigateByUrl('/');
        }
        
        else {
          this.resMsg = res.msg;
          localStorage.removeItem('userId');
        }
        console.log(res)
      }
    )


  }
  
}
