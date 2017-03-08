import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }		from './app.component';

import { AppRoutingModule }	from './app.routing';

import { UserService }  from './_services/user.service';
import { StorageService }  from './_services/storage.service';
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
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers: [UserService, StorageService, ContentService, MediaService, InventoryService, LoggedGuard, IEEEGuard, AdminGuard]
})
export class AppModule { }
