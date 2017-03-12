import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PostData } from '../_models/post';

@Injectable()
export class ContentService {

	private url = 'api/post/';

    constructor(private http: Http) {}


    savePost(post: PostData): Promise<PostData> {
        post = Object.assign({}, post);
        return this.http.post(this.url, post)
			.toPromise()
			.then((response: Response) => {
                return response.json() as PostData;
            })
			.catch(this.handleError);
    }

    getPost(id: string): Promise<PostData> {
        return this.http.get(this.url + id)
			.toPromise()
			.then((response: Response) => {
                return response.json() as PostData;
            })
			.catch(this.handleError);
    }

    getPosts(): Promise<PostData[]> {
        return this.http.get(this.url + 'all')
			.toPromise()
			.then((response: Response) => {
                return response.json() as PostData[];
            })
			.catch(this.handleError);
    }

    removePost(id: String): Promise<PostData> {
        return this.http.post(this.url + 'remove/' + id, {})
			.toPromise()
			.then((response: Response) => {
                return response.json() as PostData;
            })
			.catch(this.handleError);
    }

	publishPost(id: string): Promise<boolean> {
        return this.http.post(this.url + 'publish/' + id, {})
			.toPromise()
			.then((response: Response) => {
                return response.json() as boolean;
            })
			.catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}