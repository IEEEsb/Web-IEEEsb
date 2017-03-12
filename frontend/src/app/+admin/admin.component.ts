import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'admin',
	templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {

	constructor(private router: Router) {

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