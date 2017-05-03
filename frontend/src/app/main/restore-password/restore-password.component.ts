import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../_services/user.service';

@Component({
	
	selector: 'restore-password',
	templateUrl: './restore-password.component.html',
	styleUrls: ['./restore-password.component.less'],

})
export class RestorePasswordComponent implements OnDestroy {

	alias: string = "";
	email: string = "";

	loading: boolean = false;

	restore(): void {
		this.loading = true;
		this.userService.restorePassword(this.alias, this.email)
		.then((success: boolean) => {
			this.loading = false;
		})
		.catch(reason => {
			alert("Hubo un error");
			this.loading = false;
		});
	}

	constructor(private router: Router, private userService: UserService) {}

	ngOnDestroy() {
	}
}
