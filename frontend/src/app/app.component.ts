import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent{

	loading: boolean = true;

	constructor(private router: Router) {
		router.events.subscribe((event: RouterEvent) => {
			this.navigationInterceptor(event);
		});
	}

	navigationInterceptor(event: RouterEvent): void {
		if (event instanceof NavigationStart) {
			this.loading = true;
		} else if (event instanceof NavigationEnd) {
			this.loading = false;
		} else if (event instanceof NavigationCancel) {
			this.loading = false;
		} else if (event instanceof NavigationError) {
			this.loading = false;
		}
	}
}