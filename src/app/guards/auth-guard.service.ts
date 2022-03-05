import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../modules/core/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _common: CommonService, public router: Router) { }

  canActivate(): boolean {
    if (this._common.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigateByUrl("/auth");
      return false;
    }
  }

}