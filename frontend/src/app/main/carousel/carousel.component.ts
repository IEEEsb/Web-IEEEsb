import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	
	selector: 'carousel',
	templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {

	config: any = {};
	link: string = "register";

	ngOnInit() {

		console.log("routes");
		console.log(this.activatedRoute.snapshot.url); // array of states
		//console.log(this.activatedRoute.snapshot.url[0].path);
	}

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
		router.events.subscribe((val) => {
			// see also
			console.log(val)
		});
	}

	clicked(event: Event, config: any) {
		console.log(event);
		console.log(config);
		event.preventDefault();
		this.router.navigate(['/register']);

	}
}
