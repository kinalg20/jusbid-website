import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './containers/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';


const data = [
  FormsModule,
  ReactiveFormsModule,
]

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    ForgotPasswordComponent  
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgOtpInputModule,
    data
  ],
  exports: [
    data
  ]
})
export class AuthModule { }
