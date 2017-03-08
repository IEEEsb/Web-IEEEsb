import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard }  from './_guards/admin.guard';

const routes: Routes = [
	{ path: '', loadChildren: './app/+main/main.module#MainModule'},
	{ path: 'admin', canActivateChild: [AdminGuard], loadChildren: './app/+admin/admin.module#AdminModule' },
	{ path: 'barcode', loadChildren: './app/+barcode/barcode.module#BarcodeModule' },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }