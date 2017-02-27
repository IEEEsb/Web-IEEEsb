import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../_services/user.service';

@Component({
	selector: 'login',
	templateUrl: 'app/login/login.component.html',
	styleUrls: ['app/login/login.component.css'],
	providers: []
})
export class LoginComponent {

	alias: string = "";
	password: string = "";

	error: any;

	login(): void {
		this.userService.login(this.alias, this.password);
	}

	constructor(private router: Router, private userService: UserService) {

		userService.userSubject.subscribe((user) => {
			if(user){
				this.router.navigate([this.userService.getRedirectUrl()]);
			}
		});
	}
}
