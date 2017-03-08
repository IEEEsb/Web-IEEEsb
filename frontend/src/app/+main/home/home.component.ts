import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
	moduleId: module.id,
	selector: 'home',
	templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	ngOnInit() {
		let location = {lat: 40.451836, lng: -3.726562};
		let map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          scrollwheel: false,
          zoom: 15
        });

		let marker = new google.maps.Marker({
          map: map,
          position: location,
          title: 'Hello World!'
        });
	}
}
