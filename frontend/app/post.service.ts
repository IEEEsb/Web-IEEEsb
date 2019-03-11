import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject, throwError } from 'rxjs';
import { map, tap, delay, catchError } from 'rxjs/operators';

import { LoadingService, UtilsService } from 'angular-ieeesb-lib';

import { User } from '../../models/User';
import { Transaction } from '../../models/Transaction';

@Injectable({
	providedIn: 'root'
})
export class PostService {

	constructor(private http: HttpClient, private loadingService: LoadingService, private utilsService: UtilsService) { }

	getPublishedPosts() {
		this.loadingService.setLoading();
		return this.http.get<any>('api/post/published/all')
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}


	getPublishedPost(postId) {
		this.loadingService.setLoading();
		return this.http.get<any>(`api/post/published/${postId}`)
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}

	getPosts() {
		this.loadingService.setLoading();
		return this.http.get<any>('api/post/all')
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}

	getPost(postId) {
		this.loadingService.setLoading();
		return this.http.get<any>(`api/post/${postId}`)
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}

	addPost(post) {
		this.loadingService.setLoading();
		return this.http.post<any>(`api/post/`, post)
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}

	updatePost(postId, post) {
		this.loadingService.setLoading();
		return this.http.patch<any>(`api/post/${postId}`, post)
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}

	publishPost(postId) {
		this.loadingService.setLoading();
		return this.http.post<any>(`api/post/${postId}/publish`, {})
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}

	removePost(postId) {
		this.loadingService.setLoading();
		return this.http.delete<any>(`api/post/${postId}`)
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}
}
