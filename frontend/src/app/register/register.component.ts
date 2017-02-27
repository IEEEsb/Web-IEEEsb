import { Component } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { RegisterData } from '../_models/regdata';

@Component({
	selector: 'register',
	templateUrl: 'app/register/register.component.html',
    providers: [RegisterData]
})
export class RegisterComponent {

	confirmedPassword: string;

	error: any;
	success: boolean;

    register(): void {
        this.userService.register(this.registerData)
		.then((success: boolean) => this.success = success)
		.catch((error: any) => this.error = error);
    }

	confirmPassword(): boolean {
		return this.registerData.password !== "" && this.confirmedPassword !== "" && this.registerData.password === this.confirmedPassword;
	}
    constructor(private userService: UserService, private registerData: RegisterData) { }
}
