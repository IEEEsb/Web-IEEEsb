import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule } from '@angular/router';

import { BarcodeComponent }		from './barcode.component';
import { BarcodeInventoryComponent }  from './inventory/inventory.component';
import { BarcodeDetailsComponent }  from './details/details.component';
import { BarcodeLoginComponent }  from './login/login.component';

import { LoaderModule }		from '../loader/loader.module';

@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		FormsModule,
		LoaderModule,
		RouterModule
	],
	declarations: [
		BarcodeComponent,
		BarcodeInventoryComponent,
		BarcodeDetailsComponent,
		BarcodeLoginComponent,
	]
})
export class BarcodeModule { }
