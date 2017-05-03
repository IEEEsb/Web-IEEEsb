import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { UserService } from '../_services/user.service';

declare var $: any;

@Component({
	
	selector: 'admin',
	templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.less']
})
export class AdminComponent {

	user: any;

	constructor(private router: Router, private userService: UserService) {

		userService.userSubject.subscribe((user) => {
			this.user = user;
		});

		router.events.subscribe((val) => {
			if(val instanceof NavigationEnd){
				window.scrollTo(0, 0);
				$(function(){
					var current = location.href;
					$('.sidebar li a').each(function(){
						var $this = $(this);
						if(current.includes($this.prop("href"))){
							$this.parent().addClass('active');
						} else {
							$this.parent().removeClass('active');
						}
					})
				});
			}
		});
	}
}