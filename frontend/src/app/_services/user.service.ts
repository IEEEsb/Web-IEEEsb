import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

import { User } from '../_models/user';
import { RegisterData } from '../_models/regdata';
import { LoginData } from '../_models/logindata';

declare var CryptoJS: any;

@Injectable()
export class UserService {


    private userSubject: BehaviorSubject<User>;

    userSource$: Observable<User>;

    constructor(private http: Http) {
        this.userSubject = new BehaviorSubject<User>(localStorage.getObject('user'));
        this.userSource$ = this.userSubject.asObservable();
        let user = this.userSubject.getValue();
        console.log('user');
        if(user){
            this.http.get('api/users/getuser/' + user._id)
    			.toPromise()
    			.then((response: Response) => {
                    this.userSubject.next(response.json() as User);
                })
    			.catch((error: any) => {
                    localStorage.removeItem('user');
                    this.userSubject.next(null);
                    return this.handleError(error);
                });
        }
    }

    register(regData: RegisterData): Promise<boolean> {
        let data = Object.assign({}, regData);
        data.password = CryptoJS.SHA256(data.password).toString();
        console.log(JSON.stringify(data));
        let headers = new Headers({ 'enctype': 'multipart/form-data' });
		let options = new RequestOptions({ headers: headers });
        return this.http.post('api/users/register', data)
			.toPromise()
			.then((response: Response) => {
                this.userSubject.next(response.json() as User);
                return true;
            })
			.catch(this.handleError);
    }

    login(loginData: LoginData): Promise<boolean> {

        let data = Object.assign({}, loginData);
        data.password = CryptoJS.SHA256(data.password).toString();

        let headers = new Headers({ 'enctype': 'multipart/form-data' });
		let options = new RequestOptions({ headers: headers });
        return this.http.post('api/users/login', data)
			.toPromise()
			.then((response: Response) => {
                localStorage.setObject('user', response.json() as User);
                this.userSubject.next(localStorage.getObject('user'));
                return true;
			})
			.catch(this.handleError);
    }

    logout(): Promise<boolean> {

        return this.http.post('api/users/logout', '')
			.toPromise()
			.then((response: Response) => {
                localStorage.removeItem('user');
                this.userSubject.next(localStorage.getObject('user'));
                return true;
			})
			.catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
