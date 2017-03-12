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
		this.update();
	}

	update() {
		this.http.get('api/users/')
		.toPromise()
		.then((response: Response) => {
			this.user = response.json() as User;
			this.userSubject.next(response.json() as User);
		})
		.catch((error: any) => {
			this.user = null;
			this.userSubject.next(null);
			return this.handleError(error, true);
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

	toIEEE(id: string): Promise<boolean>{

		return this.http.post('api/users/toieee/' + id, {})
		.toPromise()
		.then((response: Response) => {
			return response.json();
		})
		.catch(this.handleError);
	}

	getUser(id: string): Promise<User>{

		return this.http.get('api/users/user/' + id)
		.toPromise()
		.then((response: Response) => {
			return response.json() as User;
		})
		.catch(this.handleError);
	}

	getAll(): Promise<User[]>{

		return this.http.get('api/users/all')
		.toPromise()
		.then((response: Response) => {
			return response.json() as User[];
		})
		.catch(this.handleError);
	}

	register(regData: any): Promise<boolean> {
		let data = Object.assign({}, regData);
		data.password = CryptoJS.SHA256(data.password).toString();
		return this.http.post('api/users/register', data)
		.toPromise()
		.then((response: Response) => {
			this.update();
			return true;
		})
		.catch(this.handleError);
	}

	login(alias: string, password?: string): Promise<boolean> {

		let body: any = {};
		if(arguments.length === 1){
			body.code = alias;
		} else if(arguments.length === 2) {
			body.alias = alias;
			body.password = CryptoJS.SHA256(password).toString();
		}

		return this.http.post('api/users/login', body)
		.toPromise()
		.then((response: Response) => {
			this.update();
			return true;
		})
		.catch(this.handleError);
	}

	loginAdmin(password: any): Promise<boolean> {
		password = CryptoJS.SHA256(password).toString();
		return this.http.post('api/inventory/loginAdmin', {password: password})
		.toPromise()
		.then((response: Response) => {
			return response.json();
		});
	}

	logout(): Promise<boolean> {

		return this.http.post('api/users/logout', {})
		.toPromise()
		.then((response: Response) => {
			this.update();
			return true;
		})
		.catch(this.handleError);
	}

	addMoney(id: string, money: any): Promise<boolean> {
		let content = { user: id, money: money }
		return this.http.post('api/users/addmoney', content)
		.toPromise()
		.then((response: Response) => {
			this.update();
			return response.json();
		})
		.catch(this.handleError);
	}

	private handleError(error: any, notUpdate?: boolean): Promise<any> {
		if(!notUpdate) this.update();
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
