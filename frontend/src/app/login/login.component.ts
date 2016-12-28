import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { LoginData } from '../_models/logindata';

@Component({
	selector: 'login',
	templateUrl: 'app/login/login.component.html',
    providers: [LoginData],
    styleUrls: ['app/login/login.component.css']
})
export class LoginComponent {

	confirmedPassword: string;

	error: any;

    login(): void {
		console.log(JSON.stringify(this.loginData));
        this.userService.login(this.loginData)
			.then((user: boolean) => this.error = !user)
			.catch((error: any) => this.error = error);
    }

    constructor(private userService: UserService, private loginData: LoginData) { }
}
