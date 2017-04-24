import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LanguajeService {

	languajeSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	constructor(private http: Http) {
		this.update();
	}

	setLanguaje(languaje: string): void {
		document.cookie = "languaje=" + languaje;
		this.update();
	}

	getCookies(): any {
		let rawCookies = document.cookie;
		rawCookies = rawCookies.split("; ");
		let cookies = {};
		for (cookie of rawCookies) {
			cookie = cookie.split("=");
			cookies[cookie[0]] = cookie[1];
		}
		return cookies;
	}

	update() {
		let cookies = this.getCookies();
		if(cookies.languaje){
			this.mediaSubject.next(cookies.languaje);
		} else {
			this.mediaSubject.next("es");
		}
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}