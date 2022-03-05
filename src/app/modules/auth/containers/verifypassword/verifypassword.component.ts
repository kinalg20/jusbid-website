import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-verifypassword',
  templateUrl: './verifypassword.component.html',
  styleUrls: ['./verifypassword.component.scss']
})
export class VerifypasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  match_password(form:NgForm){
    let data_verify = Object.assign({}, form.value);
    if(data_verify.pswd1!=data_verify.pswd2){
      alert("password do not match");
    }
    else{
      if(data_verify.pswd1.length<6){
        alert("password length should more than 6");
      }
      if(data_verify.pswd1.length>=6){
        alert("successfully matched")
      }
    }
  }

}
