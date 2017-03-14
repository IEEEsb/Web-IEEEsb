import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent{

	private loading: boolean = true;

	constructor(private router: Router) {
		router.events.subscribe((event: RouterEvent) => {
			this.navigationInterceptor(event);
		});
	}

	navigationInterceptor(event: RouterEvent): void {
		if (event instanceof NavigationStart) {
			console.log("start");
			this.loading = true;
		} else if (event instanceof NavigationEnd) {
			console.log("end");
			this.loading = false;
		} else if (event instanceof NavigationCancel) {
			console.log("cancel");
			this.loading = false;
		} else if (event instanceof NavigationError) {
			console.log(error);
			this.loading = false;
		}
	}
}