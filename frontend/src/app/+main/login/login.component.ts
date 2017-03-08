import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../_services/user.service';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	
})
export class LoginComponent implements OnDestroy {

	alias: string = "";
	password: string = "";

	error: any;

	subscription = null;

	login(): void {
		this.userService.login(this.alias, this.password);
	}

	constructor(private router: Router, private userService: UserService) {

		this.subscription = userService.userSubject.subscribe((user) => {
			if(user){
				this.router.navigate([this.userService.getRedirectUrl()]);
			}
		});
	}

	ngOnDestroy() {
		if(this.subscription) this.subscription.unsubscribe();
	}
}
