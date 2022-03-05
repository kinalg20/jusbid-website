import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';



const routes: Routes = [
 {
   path:'', component:SignInComponent
 },
 {
   path:'sign-up', component:SignUpComponent
 },
 {
  path:'login-Otp', component:LoginOtpComponent
 },
 {
  path: 'forgot-password',
  data: {
    title: "Forgot Password",
    description: "Description Meta Tag Content",
    ogUrl: "/forgot-password"
  },
  component: ForgotPasswordComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
