import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MediaService {

	mediaSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	constructor(private http: Http) {
		this.update();
	}

	getMedia(): Promise<any[]> {

		return this.http.get('api/media')
		.toPromise()
		.then((response: Response) => {
			return response.json();
		})
		.catch(this.handleError);
	}

	removeMedia(id: string): Promise<boolean> {
		return this.http.post('api/media/remove/' + id, {})
		.toPromise()
		.then((response: Response) => {
			this.update();
			return response.json();
		})
		.catch(this.handleError);
	}

	getRelativeUrl(id: string): string {
		return "./media/" + id;
	}

	update() {

		this.http.get('api/media').toPromise()
		.then((response: Response) => {
			this.mediaSubject.next(response.json());
			return response.json();
		})
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}