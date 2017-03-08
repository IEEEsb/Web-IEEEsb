import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../_services/user.service';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class BarcodeLoginComponent implements OnDestroy, OnInit, AfterViewInit {
	@ViewChild("passwordInput")
    private _passwordInput: ElementRef;

	adminLogged = false;
	userSubject = null;
	inventorySubject = null;
	password = "";
	code = "";

	constructor(private router: Router, private userService: UserService) {
		let cookies = document.cookie;
		if(cookies.indexOf('logged=') >= 0){
			this.adminLogged = true;

		}

	}

	ngOnInit() {
		this.userSubject = this.userService.userSubject.subscribe((user) => {
			if(user){
				this.router.navigate(['/barcode']);
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
		this.userService.loginAdmin(this.password)
		.then((ok) => {
			let cookies = document.cookie;
			if(cookies.indexOf('logged=') >= 0){
				this.adminLogged = true;
			}
		})
		.catch((error) => {
			alert('Hubo un error al iniciar sesión')
		});
	}

	loginUser() {
		let code = this.code;
		this.code = "";
		this.userService.login(code)
		.then((user) => {
			this.router.navigate(['/barcode/inventory']);
		})
		.catch((error) => {
			alert('Hubo un error al iniciar sesión')
		});
	}
}