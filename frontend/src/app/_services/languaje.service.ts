import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LanguajeService {

	languajeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor(private http: Http) {
		this.update();
	}

	setLanguaje(languaje: string): void {
		document.cookie = "languaje=" + languaje;
		this.update();
	}

	getCookies(): any {
		let rawStringCookies = document.cookie;
		let rawCookies = rawStringCookies.split("; ");
		let cookies = {};
		for (let rawCookie of rawCookies) {
			let cookie = rawCookie.split("=");
			cookies[cookie[0]] = cookie[1];
		}
		return cookies;
	}

	update() {
		let cookies = this.getCookies();
		if(cookies.languaje){
			this.languajeSubject.next(cookies.languaje);
		} else {
			this.languajeSubject.next("es");
		}
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}