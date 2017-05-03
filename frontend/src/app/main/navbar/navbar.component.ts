import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { UserService } from '../../_services/user.service';

declare var $: any;

@Component({

	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.less']
})
export class NavBarComponent {

	user: any;

	constructor(private router: Router, private userService: UserService) {

		userService.userSubject.subscribe((user) => {
			this.user = user;
		});

		router.events.subscribe((val) => {
			if(val instanceof NavigationEnd){
				window.scrollTo(0, 0);
				$(function(){
					var current = location.href ;
					$('nav li a').each(function(){
						var $this = $(this);
						if($this.prop("href") === current ){
							$this.parent().addClass('active');
						} else {
							$this.parent().removeClass('active');
						}
					});
					$('#navbar').collapse('hide');
				});
			}
		});
	}

	logout(): void {
		this.userService.logout()
		.then(
			(logout: boolean) => {
				if(logout){
					this.router.navigate(['/']);
				} else {
					alert('Hubo un error al desconectarse');
				}
			},
			(error) => {
				alert('Hubo un error al desconectarse')
			});
		}

	}
