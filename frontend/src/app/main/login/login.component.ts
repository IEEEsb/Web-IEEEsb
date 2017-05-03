import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../_services/user.service';

@Component({

	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less'],

})
export class LoginComponent implements OnDestroy {

	alias: string = "";
	password: string = "";

	loading: boolean = false;
	subscription: any = null;

	login(): void {
		this.loading = true;
		this.userService.login(this.alias, this.password)
		.then((success: boolean) => {
			this.loading = false;
		})
		.catch(reason => {
			alert("Hubo un error");
			this.loading = false;
		});
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
