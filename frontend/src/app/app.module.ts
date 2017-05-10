import { NgModule, ErrorHandler }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }		from './app.component';

import { AppRoutingModule }	from './app.routing';
import { LoaderModule }		from './loader/loader.module';

import { UserService }  from './_services/user.service';
import { ContentService }  from './_services/content.service';
import { MediaService }  from './_services/media.service';
import { InventoryService }  from './_services/inventory.service';

import { AdminGuard }  from './_guards/admin.guard';
import { LoggedGuard }  from './_guards/logged.guard';
import { IEEEGuard }  from './_guards/ieee.guard';

import { MainModule } from './main/main.module';
import { BarcodeModule } from './barcode/barcode.module';
import { AdminModule } from './admin/admin.module';

import * as Raven from 'raven-js';

Raven.config('https://75ad50c808a7434c9c038f1de4b60566@sentry.io/165582').install();

export class RavenErrorHandler implements ErrorHandler {
	handleError(err:any) : void {
		Raven.captureException(err.originalError);
	}
}

@NgModule({
	imports: [BrowserModule,
		HttpModule,
		FormsModule,
		AppRoutingModule,
		LoaderModule,
		MainModule,
		BarcodeModule,
		AdminModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent],
	providers: [UserService,
		ContentService,
		MediaService,
		InventoryService,
		LoggedGuard,
		IEEEGuard,
		AdminGuard,
		{ provide: ErrorHandler, useClass: RavenErrorHandler }
	]
})
export class AppModule { }
