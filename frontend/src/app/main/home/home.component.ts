import { Component, HostListener, OnInit } from '@angular/core';


@Component({

	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	width = 0;
	location = { lat: 40.451836, lng: -3.726562 };
	zoom = 15;

	ngOnInit() {
		this.width = window.innerWidth;
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.width = event.target.innerWidth;
	}
}
