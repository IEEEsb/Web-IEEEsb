import { Component } from '@angular/core';

import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
	moduleId: module.id,
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],

})
export class RegisterComponent {

	confirmedPassword: string;
	success: boolean;
	data: any = new User();

    register(): void {
        this.userService.register(this.data)
		.then((success: boolean) => {
			this.success = success
		});
    }

	confirmPassword(): boolean {
		return this.data.password && this.confirmedPassword && this.data.password === this.confirmedPassword;
	}
    constructor(private userService: UserService) { }
}
