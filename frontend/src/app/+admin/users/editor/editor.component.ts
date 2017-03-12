import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

import { UserService } from '../../../_services/user.service';

import { User } from '../../../_models/user';

@Component({
	moduleId: module.id,
	selector: 'editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css']
})
export class UserEditorComponent implements OnInit {

	private user: User = new User();
	private sub: any;
	private money = 0;

	constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private userService: UserService) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			if (params['id']) {
				this.userService.getUser(params['id'])
				.then((user: User) => {
					this.user = user;
				});
			}
		});
	}

	isIEEEuser(){
		return this.user.roles.indexOf('ieee') > 0;
	}

	toIEEE(id: any) {
		this.userService.toIEEE(id)
		.then(() => {
			this.userService.getUser(this.user._id)
			.then((user: User) => {
				this.user = user;
			});
		});
	}

	addMoney() {
		this.userService.addMoney(this.user._id, this.money)
		.then(() => {
			alert("Dinero Insertado");
			this.userService.getUser(this.user._id)
			.then((user: User) => {
				this.user = user;
			});
		})
		.catch(() => {
			alert("Hubo un error");
		});
	}
}
