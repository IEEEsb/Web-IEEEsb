import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../_services/user.service';

@Component({
	
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less'],
})
export class BarcodeLoginComponent implements OnDestroy, OnInit, AfterViewInit {
	@ViewChild("passwordInput")
    private _passwordInput: ElementRef;

	adminLogged = false;
	userSubject: any = null;
	inventorySubject: any = null;
	password: string = "";
	code: string = "";
	loading: boolean = false;

	constructor(private router: Router, private userService: UserService) {
		let cookies = document.cookie;
		if(cookies.indexOf('logged=') >= 0){
			this.adminLogged = true;

		}

	}

	ngOnInit() {
		this.userSubject = this.userService.userSubject.subscribe((user) => {
			if(user){
				this.router.navigate(['/barcode/inventory']);
			}
		});
	}

	ngAfterViewInit(): void {
        this._passwordInput.nativeElement.focus();
    }

	ngOnDestroy() {
		if(this.userSubject){
			this.userSubject.unsubscribe();
		}
	}

	loginAdmin() {
		this.loading = true;
		this.userService.loginAdmin(this.password)
		.then((ok) => {
			let cookies = document.cookie;
			if(cookies.indexOf('logged=') >= 0){
				this.adminLogged = true;
			}
			this.loading = false;
		})
		.catch((error) => {
			alert('Hubo un error al iniciar sesión');
			this.loading = false;
		});
	}

	loginUser() {
		this.loading = true;
		let code = this.code;
		this.code = "";
		this.userService.login(code)
		.then((user) => {
			this.router.navigate(['/barcode/inventory']);
			this.loading = false;
		})
		.catch((error) => {
			alert('Hubo un error al iniciar sesión');
			this.loading = false;
		});
	}
}