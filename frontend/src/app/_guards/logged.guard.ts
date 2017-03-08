import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable()
export class LoggedGuard implements CanActivate, CanActivateChild {

	constructor(private userService: UserService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		if(this.userService.user){
			return true;
		}
		this.userService.setRedirectUrl(state.url);

		this.router.navigate(['/login']);
		return false;
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		if(this.userService.user){
			return true;
		}
		this.userService.setRedirectUrl(state.url);

		this.router.navigate(['/login']);
		return false;
	}
}