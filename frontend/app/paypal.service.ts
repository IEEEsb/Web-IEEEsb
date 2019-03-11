import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';

import { LoadingService, UtilsService } from 'angular-ieeesb-lib';

@Injectable({
	providedIn: 'root'
})
export class PaypalService {

	private timeout = 250;

	constructor(private http: HttpClient, private loadingService: LoadingService, private utilsService: UtilsService) { }

	createPayment(money) {
		this.loadingService.setLoading();
		return this.http.post<any>('api/paypal/createPayment/', { money })
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}

	executePayment(paymentId, payerId) {
		this.loadingService.setLoading();
		return this.http.post<any>(`api/paypal/executePayment/${paymentId}`, { payerId })
		.pipe(
			tap((data) => {
				this.loadingService.unsetLoading();
			}),
			catchError(this.utilsService.handleError.bind(this))
		);
	}
}
