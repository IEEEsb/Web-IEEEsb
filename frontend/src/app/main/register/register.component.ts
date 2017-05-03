import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({

	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.less'],

})
export class RegisterComponent {

	confirmedPassword: string;
	data: any = new User();
	loading: boolean = false;

	register(): void {
		this.loading = true;
		this.userService.register(this.data)
		.then((success: boolean) => {
			alert("Registrado satisfactoriamente");
			this.router.navigate(['/login']);
				this.loading = false;
		})
		.catch(reason => {
			alert("Hubo un error");
				this.loading = false;
		});
	}

	confirmPassword(): boolean {
		return this.data.password && this.confirmedPassword && this.data.password === this.confirmedPassword;
	}
	constructor(private userService: UserService, private router: Router) { }
}
