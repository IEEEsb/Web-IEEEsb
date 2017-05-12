import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainRoute } from './main/main.routing';
import { BarcodeRoute } from './barcode/barcode.routing';
import { AdminRoute } from './admin/admin.routing';

import { MediaUploaderComponent }  from './admin/media-uploader/media-uploader.component';

import { AdminGuard }  from './_guards/admin.guard';

const routes: Routes = [
	MainRoute,
	AdminRoute,
	BarcodeRoute,
	{ path: 'uploader', component: MediaUploaderComponent},
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }