import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

import { User } from '../_models/user';
import { RegisterData } from '../_models/regdata';

declare var CryptoJS: any;

@Injectable()
export class UserService {

	public user: User;
	public redirectUrl: string = '/';
	public userSubject: BehaviorSubject<User>;


	constructor(private http: Http) {
		this.userSubject = new BehaviorSubject<User>(null);
		this.http.get('api/users/')
		.toPromise()
		.then((response: Response) => {
			this.user = response.json() as User;
			this.userSubject.next(response.json() as User);
		})
		.catch((error: any) => {
			this.user = null;
			this.userSubject.next(null);
			return this.handleError(error);
		});
	}

	getRedirectUrl() {
		let url = this.redirectUrl;
		this.redirectUrl = '/';

		return url;
	}

	setRedirectUrl(url: string) {
		this.redirectUrl = url;
	}

	register(regData: RegisterData): Promise<boolean> {
		let data = Object.assign({}, regData);
		data.password = CryptoJS.SHA256(data.password).toString();
		return this.http.post('api/users/register', data)
		.toPromise()
		.then((response: Response) => {
			this.user = response.json() as User;
			this.userSubject.next(response.json() as User);
			return true;
		})
		.catch(this.handleError);
	}

	login(alias: string, password: string): Promise<boolean> {

		password = CryptoJS.SHA256(password).toString();

		return this.http.post('api/users/login', {alias: alias, password: password})
		.toPromise()
		.then((response: Response) => {
			this.user = response.json() as User;
			this.userSubject.next(response.json() as User);
			return true;
		})
		.catch((error: any) => {
			this.user = null;
			this.userSubject.next(null);
			return this.handleError(error);
		});
	}

	logout(): Promise<boolean> {

		return this.http.post('api/users/logout', '')
		.toPromise()
		.then((response: Response) => {
			this.user = response.json() as User;
			this.userSubject.next(null);
			return true;
		})
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
