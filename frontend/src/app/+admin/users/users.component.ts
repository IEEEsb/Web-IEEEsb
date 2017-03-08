import { Component, OnInit } from '@angular/core';

import { UserService } from '../../_services/user.service';

import { User } from '../../_models/user';

@Component({
	moduleId: module.id,
	selector: 'users-admin',
	templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersAdminComponent implements OnInit {

	users: User[] = [];

	ngOnInit() {
		this.userService.getAll()
			.then((users: User[]) => {
				console.log(users);
				this.users = users;
			});
	}

	constructor(private userService: UserService) {}

}
