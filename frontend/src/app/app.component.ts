import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './_models/user';
import { UserService } from './_services/user.service';

@Component({
	selector: 'app',
	template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

	appUser: User;
	register: false;
	logoutC: boolean = false;
	error: any;

	logout(): void {
        this.userService.logout()
			.then()
			.catch((error: any) => this.error = error);
    }



	ngOnInit() {
		/*this.userService.getLogged().subscribe((logged: boolean) => {
			console.log(logged);
		});*/
		this.userService.userSource$.subscribe((user: User) => {
			console.log(user);
			this.appUser = user;
		});
	}

	constructor(private userService: UserService) { }
}