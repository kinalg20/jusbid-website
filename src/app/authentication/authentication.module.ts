import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { CoreModule } from '../core/core.module';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AuthenticationComponent,
    SignInComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    LoginOtpComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    FormsModule,
    CoreModule,
    NgOtpInputModule
  ]
})
export class AuthenticationModule { }
