import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }		from './app.component';
import { HomeComponent }	from './home/home.component';
import { LoginComponent }  from './login/login.component';
import { RegisterComponent }  from './register/register.component';
import { LateralComponent }  from './lateral/lateral.component';
import { InventoryComponent }  from './inventory/inventory.component';
import { ItemComponent }  from './inventory/itemFrame/item.component';

import { AppRoutingModule }	from './app-routing.module';
import { UserService }  from './_services/user.service';

@NgModule({
	imports: [BrowserModule,
		HttpModule,
		FormsModule,
		AppRoutingModule],
	declarations: [AppComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		LateralComponent,
		InventoryComponent,
		ItemComponent],
	bootstrap: [AppComponent],
	providers: [UserService]
})
export class AppModule { }
