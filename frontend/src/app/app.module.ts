import { NgModule }      from '@angular/core';
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

@NgModule({
	imports: [BrowserModule,
		HttpModule,
		FormsModule,
		AppRoutingModule,
		LoaderModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent],
	providers: [UserService, ContentService, MediaService, InventoryService, LoggedGuard, IEEEGuard, AdminGuard]
})
export class AppModule { }
