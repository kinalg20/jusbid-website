import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class UserGuard implements CanActivateChild {

    constructor(
        private router: Router
    ) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const userData = localStorage.getItem('jusbid_front_user_cred');
        if (userData) {
            const role = JSON.parse(userData).role;
            if (role === 6 || role === 4) {
                this.router.navigate(['']);
            } else {
                this.router.navigate(['auth']);
            }
        }
    }
}