import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BarcodeComponent }  from './barcode.component';
import { BarcodeInventoryComponent }  from './inventory/inventory.component';
import { BarcodeDetailsComponent }  from './details/details.component';
import { BarcodeLoginComponent }  from './login/login.component';

const routes: Routes = [
	{
		path: '', component: BarcodeComponent,
		children: [
			{ path: '', component: BarcodeLoginComponent },
			{ path: 'item/:id', component: BarcodeDetailsComponent },
			{ path: 'inventory', component: BarcodeInventoryComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BarcodeRoutingModule { }