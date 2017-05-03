import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainRoute } from './main/main.routing';
import { BarcodeRoute } from './barcode/barcode.routing';
import { AdminRoute } from './admin/admin.routing';

const routes: Routes = [
	MainRoute,
	AdminRoute,
	BarcodeRoute,
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }