import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';

import { User } from '../../../models/User';

const config = require('../../../config.json');

declare var paypal: any;

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

	user: User = {};
	error;

	constructor(private userService: UserService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.userService.getLoggedUser().subscribe((user) => {
			this.user = user;
		});
	}
}
