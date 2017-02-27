import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MediaService {

    constructor(private http: Http) {}

    getMedia(): Promise<any[]> {

        return this.http.get('/api/media').toPromise()
			.then((response: Response) => {
                return response.json();
            })
			.catch(this.handleError);
    }

	getRelativeUrl(id: string): string {
		return "/media/" + id;
	}

    private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}