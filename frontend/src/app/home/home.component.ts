import { Component } from '@angular/core';
import { Router }       from '@angular/router';

import { LateralComponent } from '../lateral/lateral.component';

@Component({
	selector: 'home',
	templateUrl: 'app/home/home.component.html',
    styleUrls: ['app/home/home.component.css']
})
export class HomeComponent {

	config: any = {};

	constructor(private router: Router) {}
	
	clicked(event, config) {
		console.log(event);
		console.log(config);
		this.router.navigate(['/register']);
		event.preventDefault();
	}
}
