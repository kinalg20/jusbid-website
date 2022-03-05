import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { SigninComponent } from './containers/signin/signin.component';

const routes: Routes = [
  {
    path: '', component: SigninComponent,
    data: {
      title: "Login",
      description: "Description Meta Tag Content",
      ogUrl: "/"
    }
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
export class AuthRoutingModule { }
